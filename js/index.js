const save = document.querySelector("#save")
const delete_btn = document.querySelector("#delete")
const task_value = document.querySelector("#input")
const task_lists = document.querySelector("#result")
let total_count = document.getElementById("count")
let arr = JSON.parse(localStorage.getItem("arr")) || []
document.addEventListener("DOMContentLoaded", function(){
    save.addEventListener("click", addTask)
    delete_btn.addEventListener("click", delete_fn)
    task_value.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            addTask()
        }
    })
    displayTask()
})
function addTask(){
    let new_task = task_value.value.trim()
    if(new_task !== ""){
        arr.push({name: new_task, disabled:false})
        task_value.value = ""
        displayTask()
        saveStorage()
    }
}
function displayTask(){
    task_lists.innerHTML = ""
    arr.forEach((item, index) => {
        let li = document.createElement("li")
        li.innerHTML = `<div class="output_li">
        <input type="checkbox" class="todo-checkbox ${item.disabled ? "checked" : ""}"/>
        <span class="${item.disabled ? "disabled" : ""}">${item.name}</span>
        <div/>
        `
        li.querySelector(".todo-checkbox").addEventListener("change", function(){
            toggleTask(index)
        })
        task_lists.appendChild(li)
    })
    total_count.innerText = arr.length
}
function saveStorage(){
    localStorage.setItem("arr", JSON.stringify(arr))
}
function delete_fn(){
    arr = []
    saveStorage()
    displayTask()
}
function toggleTask(index){
    arr[index].disabled = !arr[index].disabled
    saveStorage()
    displayTask()
}