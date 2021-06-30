function addTodo() {
  const newTodo = $(".input-todo").val();
  const todoHTML = `
    <div class="card">
      <div class="card-body">
        <p class="card-text">${escape(newTodo)}</p>
        <div class="buttons-block">
          <button
            type="button"
            class="check completed btn btn-primary btn-sm"
          >
            已完成
          </button>
          <button
            type="button"
            class="edit-todo-btn btn btn-primary btn-sm"
          >
            編輯
          </button>
          <button
            type="button"
            class="delete-todo-btn btn btn-primary btn-sm"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
    `;

  if (!newTodo) {
    // 判斷是否為空
    alert("你一定還有事情想做，再想想...");
    return;
  }

  $(".todos").prepend(todoHTML);
  // 新增的也要判斷，如果是篩選已完成狀態，就不能顯示
  if ($(".check-completed").hasClass("check-selected")) {
    $(".card").hide();
    $(".completed-background").show();
  }
  // 清空輸入欄
  $(".input-todo").val("");
}

function showIncompletedTodo(targetBtn, targetCheck) {
  targetBtn.text("未完成");
  targetBtn.removeClass("completed");
  targetBtn.addClass("incompleted");
  targetCheck.find(".edit-todo-btn").hide();
  targetCheck.parent().parent().addClass("completed-background");
  if ($(".check-incompleted").hasClass("check-selected")) {
    $(".card").show();
    $(".completed-background").hide();
  }
}

function showCompletedTodo(targetBtn, targetCheck) {
  targetBtn.text("已完成");
  targetBtn.removeClass("incompleted");
  targetBtn.addClass("completed");
  targetCheck.find(".edit-todo-btn").show();
  targetCheck.parent().parent().removeClass("completed-background");
  if ($(".check-completed").hasClass("check-selected")) {
    $(".card").hide();
    $(".completed-background").show();
  }
}

function statusSwitch(target, status) {
  if (status === "check-completed") {
    target.addClass("check-selected");
    $(".check-incompleted").removeClass("check-selected");
    $(".check-all").removeClass("check-selected");
    $(".card").hide();
    $(".completed-background").show();
  } else if (status === "check-incompleted") {
    target.addClass("check-selected");
    $(".check-completed").removeClass("check-selected");
    $(".check-all").removeClass("check-selected");
    $(".card").show();
    $(".completed-background").hide();
  } else if (status === "check-all") {
    target.addClass("check-selected");
    $(".check-completed").removeClass("check-selected");
    $(".check-incompleted").removeClass("check-selected");
    $(".card").show();
  } else return;
}

function escape(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}

function callEditTodo(target, textToBeChanged) {
  const editHTML = `
          <div class="edit-block input-group">
              <input type="text" class="edit-todo-text form-control" placeholder="${escape(
                textToBeChanged
              )}" aria-label="edit-btn" aria-describedby="edit-btn">
              <button class="edit-confirm-btn btn btn-primary" type="button" id="button-addon2">修改確定</button>
              <button class="edit-cancel-btn btn btn-primary" type="button" id="button-addon2">取消</button>
          </div>
        `;
  target.parent().parent().parent().find(".edit-block").remove(); // 避免重複出現
  target.parent().parent().parent().append(editHTML);
  editTodo();
}

function editTodo() {
  $(".edit-block").on("click", ".edit-confirm-btn", (e) => {
    const target = $(e.target);
    const editTextValue = target.parent().find(".edit-todo-text").val();
    if (!editTextValue) {
      alert("你一定有什麼事可以做的...別放棄");
      return;
    }
    target.parent().parent().find(".card-text").text(editTextValue);
    console.log($(target.parent()));
    target.parent().prev().find(".completed").show();
    $(target.parent()).remove();
  });
  $(".edit-block").on("click", ".edit-cancel-btn", (e) => {
    const target = $(e.target);
    target.parent().prev().find(".completed").show();
    $(target.parent()).remove();
  });
}

function getUserId() {
  const getUrlString = location.href;
  const url = new URL(getUrlString);
  const user_id = url.searchParams.get("user_id");
  return user_id;
}

// start
$(document).ready(() => {
  const user_id = getUserId();
  // 新增 todos
  $(".add-todo-btn").click(() => {
    // 按鈕提交新增
    addTodo();
  });
  $(".input-todo").keypress((e) => {
    // enter 也可新增
    if (e.key === "Enter") {
      addTodo();
    }
  });

  // 刪除 todos
  $(".todos").on("click", ".delete-todo-btn", (e) => {
    $(e.target).parent().parent().parent().remove();
  });

  // 切換完成與未完成
  $(".todos").on("click", ".check", (e) => {
    const targetBtn = $(e.target);
    const targetCheck = targetBtn.parent(); //buttons-block
    targetBtn.hasClass("completed")
      ? showIncompletedTodo(targetBtn, targetCheck)
      : showCompletedTodo(targetBtn, targetCheck);
  });

  // 篩選完成、未完成、全部
  $(".check-btn-block").on("click", ".check-btn", (e) => {
    const target = $(e.target);
    if (target.hasClass("check-completed")) {
      statusSwitch(target, "check-completed");
    }
    if (target.hasClass("check-incompleted")) {
      statusSwitch(target, "check-incompleted");
    }
    if (target.hasClass("check-all")) {
      statusSwitch(target, "check-all");
    }
  });

  // 編輯 todos
  $(".todos").on("click", ".edit-todo-btn", (e) => {
    const target = $(e.target);
    const textToBeChanged = target.parent().parent().find(".card-text").text();
    callEditTodo(target, textToBeChanged);
    target.parent().find(".completed").hide();
  });

  // 一鍵刪除全部
  $(".delete-all-btn").click(() => {
    alert("即將刪除所有事項...");
    $(".todos").empty();
  });

  // 儲存資料進 database
  // 只要存取狀態碼跟文字內容
  $(".save-btn").click(() => {
    const todoDataArr = [];
    $(document)
      .find(".card")
      .each((i, element) => {
        const todoDataObj = {};
        if ($(element).hasClass("completed-background")) {
          todoDataObj.state = "1";
        } else {
          todoDataObj.state = "2";
        }
        todoDataObj.content = $(element).find(".card-text").text();
        todoDataArr.push(todoDataObj);
      });
    const todoData = JSON.stringify(todoDataArr);
    const newTodos = { user_id: user_id, todos: todoData };
    $.ajax({
      type: "POST",
      url: `http://mentor-program.co/mtr04group1/chinghsuan/week12/hw2/api_add_todos.php`,
      data: newTodos,
    })
      .done((data) => {
        const user_id = data.user_id;
        const message = data.message;
        const successMessage = `${message}下次只要在網址後面加上?user_id=${user_id}，就能繼續編輯！`;

        alert(successMessage);
      })
      .fail((err) => alert(err));
  });

  // 讀取 database 資料
  if (user_id) {
    $.ajax({
      type: "GET",
      url: `http://mentor-program.co/mtr04group1/chinghsuan/week12/hw2/api_todos.php?user_id=${user_id}`,
    })
      .done((response) => {
        const getTodosFromDatabase = JSON.parse(response.todos[0].content);
        for (let todo of getTodosFromDatabase) {
          const stateOneHTML = `
                <div class="card completed-background">
                    <div class="card-body">
                        <p class="card-text">${escape(todo.content)}</p>
                        <div class="buttons-block">
                        <button
                            type="button"
                            class="check btn btn-primary btn-sm incompleted"
                        >
                            未完成
                        </button>
                        <button
                            type="button"
                            class="edit-todo-btn btn btn-primary btn-sm" style="display: none;"
                        >
                            編輯
                        </button>
                        <button
                            type="button"
                            class="delete-todo-btn btn btn-primary btn-sm"
                        >
                            刪除
                        </button>
                        </div>
                    </div>
                </div>
                `;
          const stateTwoHTML = `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">${escape(todo.content)}</p>
                        <div class="buttons-block">
                        <button
                            type="button"
                            class="check btn btn-primary btn-sm completed"
                        >
                            已完成
                        </button>
                        <button
                            type="button"
                            class="edit-todo-btn btn btn-primary btn-sm"
                        >
                            編輯
                        </button>
                        <button
                            type="button"
                            class="delete-todo-btn btn btn-primary btn-sm"
                        >
                            刪除
                        </button>
                        </div>
                    </div>
                </div>
            `;
          if (todo.state === "1") {
            $(".todos").append(stateOneHTML);
          } else {
            $(".todos").append(stateTwoHTML);
          }
        }
      })
      .fail((err) => alert(err));
  }
});
