
//here we hold the two input 
let todoInput =document.getElementById("todo-input");
let addbutton = document.getElementById("addButton");
let worspace = document.getElementById("workspace");
let updateButton = document.getElementById("update-button");
let searchButton=document.getElementById("search-button")
let index;

//then we should make afunction thst add elements from the inputs


let todoItems=[];  // here is the array that holds the data

// this if condition is to display the items  in the loacl storage even if we reload the page 
if (localStorage.getItem("ToDo")) 
{
    todoItems=JSON.parse(localStorage.getItem("ToDo"));
    display()
    
}


//the meaning of this if statment that if the inpiut was containd data then push THE var  into the array 
function addToDo(){
   let todoItem= todoInput.value;
    if (todoItem) {
        todoItems.push(todoItem); 
        localStorage.setItem("ToDo",JSON.stringify(todoItems)) // here we make a file in the local storage and store the array in the shap of array 
        display();
        todoInput.value=" "; // here we make input empty after adding 
        
    }
    else
    {
        alert("please enter todo");
    }

}


// here  we gonna face a proplm that we want to store those data on the browesr so 
//we gonna set the items i input in the local storage 
  


// here we gonna make a function to display the data we enter

  function display()
  {
    let box =``;
    for (let i = 0; i < todoItems.length; i++) {
       box += `
          
       <div class="bg-white  p-3 mb-1 border border-1 d-flex justify-content-between align-items-center shadow-sm">
                            <div class="text">
                                <span class="fs-5">${todoItems[i]}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-trash-can px-2 cursor-pointer text-danger fs-5" onclick="deleteTodo(${i})"></i>
                                <i class="fa-solid fa-pen-to-square px-2 cursor-pointer text-success fs-5" onclick="updateTodo(${i})" ></i>
                            </div>
                            </div>
       
       `;
        

    }
    worspace.innerHTML=box; 
 
  }
 

  // here we are going to make a function to delete the data on click 

  function deleteTodo(index)
  {
    todoItems.splice(index,1);
    localStorage.setItem("ToDo",JSON.stringify(todoItems));//here we set items again after deleting 
    display();
  }

     

//here we gonna make edit function 

function updateTodo(i)
{
    addbutton.classList.replace("d-block","d-none");
    updateButton.classList.replace("d-none","d-block"); // here after hide the submit btn the update btn will show 
    todoInput.value = todoItems[i];
    index=[i];
}

// wee gonna make a function to reverse all we have don in the delete function 

function afterUpdate()
{
    var i = index;
    todoItems [i]=todoInput.value; // here to display the value in the array in the input again 
    localStorage.setItem("ToDo",JSON.stringify(todoItems));
    display();
    todoInput.value = ''; // to empty the inpiut after editing 
    updateButton.classList.replace("d-block","d-none");
    addbutton.classList.replace("d-none","d-block");
}


// here we gonna make the search function 
function searchTodo(term)
{
    var sbox = ``;
    for (let i = 0; i < todoItems.length; i++) {
     if (todoItems[i].toLowerCase().includes(term.toLowerCase())) {
        sbox += ` <div
        class="bg-white p-3 mb-1 border border-1 d-flex justify-content-between align-items-center shadow-sm">
        <div class="text border-dark shadow-lg  ">
            <span class="fs-5 ">${todoItems[i]}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash-can px-2 cursor-pointer text-danger fs-5" onclick="deleteTodo(${i})"></i>
            <i class="fa-solid fa-pen-to-square px-2 cursor-pointer text-success fs-5" onclick="updateTodo(${i})" ></i>
        </div>
    </div>`
     }
        
     }
     worspace.innerHTML=sbox;
        
    }
    
    searchButton.addEventListener("input", function()
    {
        searchTodo(searchButton.value)
    })


