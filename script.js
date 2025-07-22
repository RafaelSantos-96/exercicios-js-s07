 // Elementos principais
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const searchInput = document.getElementById("searchInput");

    // Carregar tarefas do localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Função para renderizar tarefas
    const renderTasks = (filter = "") => {
      taskList.innerHTML = "";

      tasks
        .filter(task => task.toLowerCase().includes(filter.toLowerCase()))
        .forEach((task, index) => {
          const li = document.createElement("li");
          li.textContent = task;

          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remover";
          removeBtn.onclick = () => removeTask(index);

          li.appendChild(removeBtn);
          taskList.appendChild(li);
        });
    };

    // Adicionar tarefa (Ex. 1 e 2)
    const addTask = (event) => {
      event.preventDefault();
      const newTask = taskInput.value.trim();
      if (newTask) {
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        renderTasks(searchInput.value);
      }
    };

    // Remover tarefa (Ex. 3)
    const removeTask = (indexToRemove) => {
      tasks = tasks.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(searchInput.value);
    };

    // Filtrar tarefas (Ex. 4)
    searchInput.addEventListener("input", () => {
      renderTasks(searchInput.value);
    });

    // Evento de envio do formulário
    taskForm.addEventListener("submit", addTask);

    // Inicializar lista
    renderTasks();