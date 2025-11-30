// * ============================================
// * TASKFLOW PRO - PRODUCTION READY
// * ============================================

// ! Configuration
const CONFIG = {
  STORAGE_KEY: "taskflow-tasks",
  CATEGORY_COLORS: {
    work: "bg-blue-100 text-blue-800",
    personal: "bg-green-100 text-green-800",
    urgent: "bg-red-100 text-red-800",
    fitness: "bg-purple-100 text-purple-800",
    learning: "bg-indigo-100 text-indigo-800",
  },
  PRIORITY_COLORS: {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  },
};

// ? State Management
const state = {
  tasks: [],
  filter: "all",
  search: "",
};

// ! DOM Elements
const elements = {
  dailyQuote: document.getElementById("dailyQuote"),
  quoteAuthor: document.getElementById("quoteAuthor"),
  taskInput: document.getElementById("taskInput"),
  categorySelect: document.getElementById("categorySelect"),
  prioritySelect: document.getElementById("prioritySelect"),
  dueDateInput: document.getElementById("dueDateInput"),
  searchInput: document.getElementById("searchInput"),
  totalTasks: document.getElementById("totalTasks"),
  completionRate: document.getElementById("completionRate"),
  activeTasks: document.getElementById("activeTasks"),
  completedTasks: document.getElementById("completedTasks"),
  devNews: document.getElementById("devNews"),
  refreshNewsBtn: document.getElementById("refreshNewsBtn"),
  weatherWidget: document.getElementById("weatherWidget"),
  cityInput: document.getElementById("cityInput"),
  getWeatherBtn: document.getElementById("getWeatherBtn"),
  clearCompletedBtn: document.getElementById("clearCompletedBtn"),
  exportBtn: document.getElementById("exportBtn"),
  sortByDateBtn: document.getElementById("sortByDateBtn"),
  addTaskBtn: document.getElementById("addTaskBtn"),
  taskList: document.getElementById("taskList"),
};

// * ============================================
// * Core Application - TASKFLOW PRO
// * ============================================

const TaskFlow = {
  init() {
    this.loadTasks();
    this.setupEvents();
    this.render();
    this.loadDailyQuote();
    this.loadWeather("Dhaka");
    this.loadDevNews();
  },

  // Storage Management
  loadTasks() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
    state.tasks = saved ? JSON.parse(saved) : [];
  },
  saveTasks() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.tasks));
  },

  // Event Handling
  setupEvents() {
    elements.addTaskBtn.addEventListener("click", () => this.addTask());
    elements.taskInput.addEventListener(
      "keypress",
      (e) => e.key === "Enter" && this.addTask()
    );
    elements.searchInput.addEventListener("input", (e) => {
      state.search = e.target.value.toLowerCase();
      this.render();
    });
    elements.clearCompletedBtn.addEventListener("click", () =>
      this.clearCompleted()
    );
    elements.exportBtn.addEventListener("click", () => this.exportTasks());
    elements.sortByDateBtn.addEventListener("click", () => this.sortByDate());
    elements.getWeatherBtn.addEventListener("click", () =>
      this.loadWeather(elements.cityInput.value || "Dhaka")
    );
    elements.refreshNewsBtn.addEventListener("click", () => this.loadDevNews());
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        state.filter = e.target.dataset.filter;
        this.render();
      });
    });
  },

  // Task Operations
  addTask() {
    const text = elements.taskInput.value.trim();
    if (!text) return alert("Enter any task....");

    const task = {
      id: Date.now(),
      text,
      completed: false,
      category: elements.categorySelect.value,
      priority: elements.prioritySelect.value,
      dueDate: elements.dueDateInput.value,
      createdAt: new Date().toISOString(),
    };

    state.tasks.unshift(task);
    this.saveTasks();
    this.resetForm();
    this.render();
  },

  deleteTask(id) {
    state.tasks = state.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.render();
  },

  toggleComplete(id) {
    // ✅ FIXED VERSION:
    state.tasks = state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
    this.render();
  },

  editTask(id) {
    const task = state.tasks.find((t) => t.id === id);
    if (!task) return; // Exit if task not found

    const newText = prompt("Edit task...", task.text);
    if (!newText?.trim()) return; // Exit if input is empty or canceled

    task.text = newText.trim();

    this.saveTasks();
    this.render();
  },

  clearCompleted() {
    if (confirm("Delete all completed tasks?")) {
      state.tasks = state.tasks.filter((task) => !task.completed);
      this.saveTasks();
      this.render();
    }
  },

  sortByDate() {
    state.tasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    this.render();
  },

  getFilteredTasks() {
    const { filter, search, tasks } = state;
    let filtered = tasks;

    if (filter === "active") filtered = filtered.filter((t) => !t.completed);
    if (filter === "completed") filtered = filtered.filter((t) => t.completed);
    if (filter === "high")
      filtered = filtered.filter((t) => t.priority === "high");

    // Category filter
    if (!["all", "active", "completed", "high"].includes(filter)) {
      filtered = filtered.filter((t) => t.category === filter);
    }

    // Search filter
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((t) => t.text.toLowerCase().includes(s));
    }
    return filtered;
  },

  render() {
    const tasks = this.getFilteredTasks();
    const list = elements.taskList;

    list.innerHTML = tasks.length
      ? tasks.map((t) => this.renderTask(t).outerHTML).join("") // ✅ FIXED!
      : this.renderEmptyState();

    this.updateStats();
  },

  renderTask(task) {
    const div = document.createElement("div");
    div.className = `task-item bg-white rounded-xl p-4 shadow hover:shadow-md transition ${
      task.completed ? "opacity-60" : ""
    }`;

    div.innerHTML = `
                          <div class="flex items-start gap-3">
                              <button onclick="TaskFlow.toggleComplete(${
                                task.id
                              })"
                                      class="mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition
                                             ${
                                               task.completed
                                                 ? "bg-green-500 border-green-500"
                                                 : "border-gray-300 hover:border-indigo-500"
                                             }">
                                  ${task.completed ? "✓" : ""}
                              </button>
                              <div class="flex-1">
                                  <p class="text-lg ${
                                    task.completed
                                      ? "line-through text-gray-400"
                                      : "text-gray-800"
                                  }">
                                      ${task.text}
                                  </p>
                                  <div class="flex flex-wrap gap-2 mt-2">
                                      <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                        CONFIG.CATEGORY_COLORS[task.category]
                                      }">
                                          ${task.category}
                                      </span>
                                      <span class="px-2 py-1 rounded-full text-xs font-medium ${
                                        CONFIG.PRIORITY_COLORS[task.priority]
                                      }">
                                          ${task.priority}
                                      </span>
                                      ${
                                        task.dueDate
                                          ? `
                                          <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                              📅 ${new Date(
                                                task.dueDate
                                              ).toLocaleDateString()}
                                          </span>
                                      `
                                          : ""
                                      }
                                  </div>
                              </div>
                              <div class="flex gap-2">
                                  <button onclick="TaskFlow.editTask(${
                                    task.id
                                  })"
                                          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                  <button onclick="TaskFlow.deleteTask(${
                                    task.id
                                  })"
                                          class="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                          </div>
                      `;

    return div;
  },

  renderEmptyState() {
    return `
                          <div class="bg-white rounded-xl p-12 text-center shadow">
                              <p class="text-gray-400 text-lg">No tasks found!</p>
                          </div>
                      `;
  },

  // Utilities
  resetForm() {
    elements.taskInput.value = "";
    elements.dueDateInput.value = "";
  },

  updateStats() {
    const total = state.tasks.length;
    const completed = state.tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("activeTasks").textContent = active;
    document.getElementById("completionRate").textContent = rate + "%";
  },

  exportTasks() {
    const data = JSON.stringify(state.tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taskflow-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  },

  // API Functions
  async loadDailyQuote() {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      elements.dailyQuote.textContent = `"${data.quote}"`;
      elements.quoteAuthor.textContent = `— ${data.author}`;
    } catch (err) {
      elements.dailyQuote.textContent =
        '"The way to get started is to quit talking and begin doing."';
      elements.quoteAuthor.textContent = "— Walt Disney";
    }
  },

  async loadWeather(city) {
    elements.weatherWidget.innerHTML =
      '<p class="text-gray-500 loading">Loading...</p>';
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        elements.weatherWidget.innerHTML =
          '<p class="text-red-500">City not found!</p>';
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      const weather = weatherData.current_weather;

      elements.weatherWidget.innerHTML = `
                              <div class="text-center">
                                  <p class="text-3xl mb-2">${this.getWeatherEmoji(
                                    weather.weathercode
                                  )}</p>
                                  <p class="text-2xl font-bold text-gray-800">${Math.round(
                                    weather.temperature
                                  )}°C</p>
                                  <p class="text-gray-600">${name}</p>
                                  <p class="text-sm text-gray-500 mt-2">Wind: ${
                                    weather.windspeed
                                  } km/h</p>
                              </div>
                          `;
    } catch (error) {
      elements.weatherWidget.innerHTML =
        '<p class="text-red-500">Failed to load weather</p>';
    }
  },

  getWeatherEmoji(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    return "🌤️";
  },

  // Add to API Functions section:
  async loadDevNews() {
    elements.devNews.innerHTML =
      '<p class="text-gray-500 text-center loading">Loading latest articles...</p>';

    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 8000);

      const response = await fetch(
        "https://dev.to/api/articles?top=5&per_page=10",
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) throw new Error("News API failed");

      const articles = await response.json();

      if (articles.length === 0) {
        elements.devNews.innerHTML =
          '<p class="text-gray-500 text-center">No articles found</p>';
        return;
      }

      elements.devNews.innerHTML = articles
        .map(
          (article) => `
            <a href="${article.url}" target="_blank" class="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition group">
                <h3 class="font-semibold text-gray-800 group-hover:text-indigo-600 text-sm line-clamp-2">
                    ${article.title}
                </h3>
                <div class="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>👤 ${article.user.name}</span>
                    <span>❤️ ${article.public_reactions_count}</span>
                </div>
            </a>
        `
        )
        .join("");
    } catch (error) {
      console.error("News API error:", error);
      elements.devNews.innerHTML = `
            <div class="text-center text-gray-500">
                <p>Failed to load news</p>
                <p class="text-xs mt-1">Check Dev.to for latest articles</p>
            </div>
        `;
    }
  },
};

// Initialize App
TaskFlow.init();
