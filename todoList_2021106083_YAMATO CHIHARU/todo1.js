const todoInputElem =$('#todo-input');
let todos=[{id: 1, content : "중간 프로젝트 DUE 2022-10-28 23:59", isCompleted: false}];

let id = 1; 

const appendTodos=(text)=> {
    let newId = ++ id;
    const newTodos = todos.concat({id: newId, content: text, isCompleted: false});
    todos= newTodos;
    paintTodos();
};


const deleteTodos =(todoId)=> {
    const newTodos = todos.filter(todo => todo.id !== todoId);
    todos = newTodos;
    paintTodos;
    activeTodos();
};


const todoListElem =$('#todo-container');

const paintTodo =(_, todo) => {
    const todoItemElem =$('<div>').addClass('todo-item p-2 input-group');
    const todoElem =$('<input>').attr("type","text").attr("disabled",true).addClass("todo form-control").val(todo.content);
      
    const todoCheckbox =$('<input>').attr("type","checkbox").addClass("todo checkbox");
    todoCheckbox.click(() => completeTodo(todo.id));

    const todoDeleteBtn =$('<button>').attr("type","button").addClass("btn btn-secondary md-2 ml-2 col-2").text('delete');
    todoDeleteBtn.click(()=> {
        deleteTodos(todo.id);
        todoItemElem.remove();  
    });

    todoItemElem.append(todoCheckbox);
    todoItemElem.append(todoElem);
    todoItemElem.append(todoDeleteBtn);
    todoListElem.append(todoItemElem);

};
const completeTodo = (completeId) => {
    $.each(todos,(_, todo)=>{
        if (todo.id == completeId) {
            todo.isCompleted = !todo.isCompleted;
            activeTodos(); 
        };
    });
  
  
};
const paintTodos = () => {
    todoListElem.empty();
    $.each(todos, paintTodo);
    activeTodos();
};

const todoAddBtnElem = $('#todo-btn-add');


const init = () => {
    todoAddBtnElem.on('click', ()=> {
        if(todoInputElem.val() != ""){
            appendTodos(todoInputElem.val()); todoInputElem.val('');
        };
    });

    todoInputElem.on('keypress', (e) => {
        if (e.key === 'Enter' && $(e.target).val() != ""){
            appendTodos($(e.target).val()); $(e.target).val('');
        };
    });
    paintTodos();
    activeTodos();
   
};
// button들 정의
const completedBtn =$('#completed');
const activeBtn =$('#active');
const allBtn =$('#all');
const clearCompletedBtn =$('#clear')

//남은 미완료 항목 수 표시
const leftItemsElem =$('.leftItems')

const activeTodos = () => {
    const actives = todos.filter(todo => todo.isCompleted === false);
    activesNum = actives.length;
    let addHtml =`<p> ${activesNum} items left</p>`
    leftItemsElem.html(addHtml);
};


const clearComplete = () => {
    const actives = todos.filter(todo => todo.isCompleted === false);
    const newTodos = actives;
    todos = newTodos;
    
    paintTodos();
    activeTodos(); 
};


$(function() {
    init();
    paintTodos();  
   
    allBtn.on('click', ()=> {
            
        if ($('input').is(':checked')) {
            $('input:checkbox').prop('checked', false);
        }
        
        else {
            $('input:checkbox').prop('checked',true)
            
        }
       
    }); // All 버튼은 눌렀을 때 일괄 완료처리, 다시 한번 눌렀을 때 모든체크 표시 해제


    clearCompletedBtn.on('click', ()=> {
        if ($('input').is(':checked')) {
            clearComplete();
        }
        paintTodos();
    }); //clear completed 버튼을 눌렀을 때, 모든 완료 표시 항목 삭제
    
    
    completedBtn.on('click', ()=> {
        completedTodosDisplay();
        paintTodos();         
    });//버튼을 눌렀을 때, 완료 항목만 표시 
    
    
    activeBtn.on('click', ()=> {
        clearComplete();
        paintTodos();
    }); //버튼을 눌렀을 때, 미완료 항목만 표시 

});
const completedTodosDisplay = () => {
    const complete = todos.filter(todo => todo.isCompleted === true);
    const newTodos = complete;
    todos = newTodos;
    paintTodos(); 
    activeTodos();         
};
