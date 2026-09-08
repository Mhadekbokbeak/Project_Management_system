import { useState, useEffect } from "react";
import API from "../api";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject._id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
      if (res.data.length > 0) setSelectedProject(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await API.get(`/tasks?projectId=${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    try {
      const res = await API.post("/projects", { title: newProjectTitle });
      setProjects([...projects, res.data]);
      setSelectedProject(res.data);
      setNewProjectTitle("");
    } catch (err) {
      alert("สร้าง Project ไม่สำเร็จ");
    }
  };

  const openDeleteModal = (project, e) => {
    e.stopPropagation();
    setProjectToDelete(project);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const projectId = projectToDelete._id;
      await API.delete(`/projects/${projectId}`);

      const updatedProjects = projects.filter((p) => p._id !== projectId);
      setProjects(updatedProjects);

      if (selectedProject?._id === projectId) {
        setSelectedProject(updatedProjects.length > 0 ? updatedProjects[0] : null);
        setTasks([]);
      }
    } catch (err) {
      alert("ลบ Project ไม่สำเร็จ");
    } finally {
      setProjectToDelete(null);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProject) return;
    try {
      const res = await API.post("/tasks", {
        title: newTaskTitle,
        projectId: selectedProject._id,
      });
      setTasks([...tasks, res.data]);
      setNewTaskTitle("");
    } catch (err) {
      alert("สร้าง Task ไม่สำเร็จ");
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const res = await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      alert("อัปเดตสถานะไม่สำเร็จ");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      alert("ลบ Task ไม่สำเร็จ");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] dark:bg-stone-950 text-stone-800 dark:text-stone-100 font-sans antialiased selection:bg-stone-200 dark:selection:bg-stone-800 transition-colors duration-200">
      
      {/* Dark Mode Toggle Position */}
      <div className="absolute top-4 right-4 z-30">
        <DarkModeToggle />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#FAF9F6]/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-transparent dark:border-stone-900/60 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-800 dark:bg-stone-100"></span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 tracking-tight text-base">TaskSpace</span>
          </div>

          <div className="flex items-center space-x-3 pr-10 sm:pr-0">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 bg-stone-200/50 dark:bg-stone-800/80 px-3 py-1 rounded-full">
              {user.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-stone-400 hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-200 transition-colors px-2 py-1"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sidebar Projects */}
          <aside className="lg:col-span-4 bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800/80 rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-200">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Projects</h2>
              <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">{projects.length}</span>
            </div>

            {/* Add Project */}
            <form onSubmit={handleCreateProject} className="mb-4">
              <div className="flex items-center bg-[#F5F4F0] dark:bg-stone-800 rounded-2xl px-3 py-1.5 focus-within:ring-1 focus-within:ring-stone-300 dark:focus-within:ring-stone-600 transition-all">
                <input
                  type="text"
                  placeholder="New project..."
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full text-xs bg-transparent border-none focus:outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 py-1"
                />
                <button
                  type="submit"
                  className="text-xs font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 px-2 py-0.5 rounded-lg transition-colors"
                >
                  +
                </button>
              </div>
            </form>

            {/* Project List */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none">
              {projects.map((proj) => {
                const isActive = selectedProject?._id === proj._id;
                return (
                  <div
                    key={proj._id}
                    onClick={() => setSelectedProject(proj)}
                    className={`group shrink-0 lg:shrink flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#F3F1EC] dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold"
                        : "text-stone-500 dark:text-stone-400 hover:bg-[#F8F7F4] dark:hover:bg-stone-800/50 hover:text-stone-800 dark:hover:text-stone-200"
                    }`}
                  >
                    <span className="truncate pr-2">{proj.title}</span>
                    <button
                      onClick={(e) => openDeleteModal(proj, e)}
                      className="opacity-100 lg:opacity-0 group-hover:opacity-100 text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-rose-400 text-xs px-1.5 transition-all"
                      title="Delete Project"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Delete Confirmation Modal */}
          {projectToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800 rounded-2xl p-6 max-w-sm w-full shadow-xl transition-all">
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100">ยืนยันการลบโปรเจกต์</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  คุณต้องการลบโปรเจกต์ <span className="font-semibold text-stone-700 dark:text-stone-200">"{projectToDelete.title}"</span> รวมถึงงานทั้งหมดในโปรเจกต์นี้ใช่หรือไม่?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setProjectToDelete(null)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={confirmDeleteProject}
                    className="px-4 py-2 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-colors shadow-sm"
                  >
                    ลบโปรเจกต์
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Tasks Workspace */}
          <section className="lg:col-span-8 bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-none min-h-[420px] flex flex-col transition-colors duration-200">
            {selectedProject ? (
              <>
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 pb-4 border-b border-stone-100 dark:border-stone-800/80">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">Current Workspace</span>
                    <div className="flex items-center space-x-3 mt-0.5">
                      <h1 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100 tracking-tight">{selectedProject.title}</h1>
                      <button
                        onClick={(e) => openDeleteModal(selectedProject, e)}
                        className="text-xs text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-stone-400 dark:text-stone-500 font-mono">
                    {tasks.filter((t) => t.completed).length}/{tasks.length} Done
                  </div>
                </div>

                {/* Add Task Input */}
                <form onSubmit={handleCreateTask} className="mb-6">
                  <div className="flex items-center bg-[#F5F4F0] dark:bg-stone-800 rounded-2xl p-1.5 focus-within:ring-1 focus-within:ring-stone-300 dark:focus-within:ring-stone-600 transition-all">
                    <input
                      type="text"
                      placeholder="Write a new task..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 px-3 py-1.5"
                    />
                    <button
                      type="submit"
                      className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 text-xs font-medium px-4 py-2 rounded-xl transition-all shrink-0 shadow-sm"
                    >
                      Add
                    </button>
                  </div>
                </form>

                {/* Task Items */}
                <div className="space-y-2 flex-1">
                  {tasks.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-stone-300 dark:text-stone-600 text-xs tracking-wide">
                      No tasks in this project yet
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <div
                        key={task._id}
                        className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all ${
                          task.completed
                            ? "bg-[#FAFAFA] dark:bg-stone-900/40"
                            : "bg-[#FBFBF9] hover:bg-[#F5F4F0] dark:bg-stone-800/50 dark:hover:bg-stone-800"
                        }`}
                      >
                        <label className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0 pr-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task)}
                            className="w-4 h-4 rounded-full accent-stone-800 dark:accent-stone-100 cursor-pointer border-none bg-stone-200 dark:bg-stone-700"
                          />
                          <span
                            className={`text-xs sm:text-sm truncate transition-all ${
                              task.completed
                                ? "line-through text-stone-300 dark:text-stone-600"
                                : "text-stone-700 dark:text-stone-200 font-medium"
                            }`}
                          >
                            {task.title}
                          </span>
                        </label>

                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="opacity-100 sm:opacity-0 group-hover:opacity-100 text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-rose-400 text-xs px-2 py-1 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-stone-300 dark:text-stone-600 py-12">
                <span className="text-xs tracking-wide">Select or create a project to start</span>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}