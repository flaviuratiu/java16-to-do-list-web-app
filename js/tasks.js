window.ToDoList = {

    // weak typed (js) vs strong typed (java)
    API_URL: "http://localhost:8082/tasks",

    createTask: function () {
        const descriptionValue = $('#task-description').val();
        const deadlineValue = $('#task-deadline').val();

        let body = {
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_URL,
            method: "POST",
            // MIME type
            contentType: "application/json",
            data: JSON.stringify(body)
        }).done(function () {
            ToDoList.getTasks();
        });
    },

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_URL,
            method: "GET"
        }).done(function (response) {
            ToDoList.displayTasks(JSON.parse(response));
        })
    },

    getTaskRow: function (task) {
        // spread syntax
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString("ro");

        // ternary operator
        let checkedAttribute = task.done ? "checked" : "";

        // if (task.done) {
        //     checkedAttribute = "checked";
        // } else {
        //     checkedAttribute = "";
        // }

        return `
            <tr>
                <td>${task.description}</td>
                <td>${formattedDeadline}</td>
                <td><input type="checkbox" class="mark-done" data-id=${task.id} ${checkedAttribute}></td>
                <td><a href="#" class="delete-link" data-id=${task.id}><i class="fas fa-trash-alt"></i></a></td>
            </tr>
        `;
    },

    displayTasks: function (tasks) {
        let tasksHtml = '';

        tasks.forEach(task => tasksHtml += ToDoList.getTaskRow(task));

        $('#tasks tbody').html(tasksHtml);
    },

    bindEvents: function () {
        $('#create-task-form').submit(function (event) {
            event.preventDefault();

            ToDoList.createTask();
        });
    }

};

ToDoList.getTasks();
ToDoList.bindEvents();

