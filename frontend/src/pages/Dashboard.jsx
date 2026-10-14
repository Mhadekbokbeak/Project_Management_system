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
    <div className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-200 font-sans antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-200">
      
      {/* Dark Mode Toggle Position */}
      <div className="absolute top-4 right-4 z-30">
        <DarkModeToggle />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100"></span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 tracking-[0.12em] text-sm uppercase">TaskSpace</span>
          </div>

          <div className="flex items-center space-x-3 pr-10 sm:pr-0">
            <span className="text-[11px] font-normal text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 px-3 py-2 rounded-sm">
              {user.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors px-2 py-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Sidebar Projects */}
          <aside className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm p-6 transition-colors duration-200">
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">Projects</h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{projects.length}</span>
            </div>

            {/* Add Project */}
            <form onSubmit={handleCreateProject} className="mb-4">
              <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm px-3 py-2 focus-within:border-neutral-500 dark:focus-within:border-neutral-400 transition-colors">
                <input
                  type="text"
                  placeholder="New project..."
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full text-xs bg-transparent border-none focus:outline-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 py-1"
                />
                <button
                  type="submit"
                  className="text-base font-light text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 px-2 transition-colors"
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
                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100"
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
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-sm p-7 max-w-sm w-full shadow-xl transition-all">
                <h3 className="text-lg font-medium tracking-wide text-neutral-900 dark:text-neutral-100">ยืนยันการลบโปรเจกต์</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                  คุณต้องการลบโปรเจกต์ <span className="font-medium text-neutral-800 dark:text-neutral-200">"{projectToDelete.title}"</span> รวมถึงงานทั้งหมดในโปรเจกต์นี้ใช่หรือไม่?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setProjectToDelete(null)}
                    className="px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={confirmDeleteProject}
                    className="px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 rounded-sm transition-colors"
                  >
                    ลบโปรเจกต์
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Tasks Workspace */}
          <section className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm p-6 sm:p-10 min-h-[420px] flex flex-col transition-colors duration-200">
            {selectedProject ? (
              <>
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-9 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Current Workspace</span>
                    <div className="flex items-center space-x-3 mt-2">
                      <h1 className="text-xl sm:text-2xl font-light text-neutral-950 dark:text-neutral-50 tracking-[0.04em]">{selectedProject.title}</h1>
                      <button
                        onClick={(e) => openDeleteModal(selectedProject, e)}
                        className="text-xs text-stone-400 dark:text-stone-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {tasks.filter((t) => t.completed).length}/{tasks.length} Done
                  </div>
                </div>

                {/* Add Task Input */}
                <form onSubmit={handleCreateTask} className="mb-6">
                  <div className="flex items-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-sm p-1.5 focus-within:border-neutral-500 dark:focus-within:border-neutral-400 transition-colors">
                    <input
                      type="text"
                      placeholder="Write a new task..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 px-3 py-1.5"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 text-[10px] font-medium uppercase tracking-[0.12em] px-5 py-3 rounded-sm transition-colors shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </form>

                {/* Task Items */}
                <div className="space-y-2 flex-1">
                  {tasks.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-xs tracking-wide">
                      No tasks in this project yet
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <div
                        key={task._id}
                        className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all ${
                          task.completed
                            ? "border-b border-neutral-100 dark:border-neutral-800"
                            : "border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
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
                                ? "line-through text-neutral-400 dark:text-neutral-500"
                                : "text-neutral-800 dark:text-neutral-200 font-normal"
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
              <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400 py-12">
                <span className="text-xs tracking-wide">Select or create a project to start</span>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}