let find = document.getElementById("find-title")
let findActor = document.getElementById("find-actor")
let title = document.getElementById("content-title")
let result = document.querySelector(".main-result")
let search = document.querySelector(".main-search")

let Login_Form = document.getElementById("Login_Form")
let actorsearch = document.getElementById("byActor")

let SearchToggle = document.getElementById("Toggle-search")

//let item1 = '<div class="result-item"><div class="title"><p>'
//let item2 = '</p></div><button class="add">Add</button></div>'

let actorList = ['chuk','gek','cheburek']

let login = document.getElementById('login')
let nicknameInput = document.getElementById('nickname')
let passwordInput = document.getElementById('password')
let unlog = document.getElementById('unlog')


let isLogged = localStorage.getItem('IsLogged')
window.onload=function(event){
    event.preventDefault()
    //alert('Loaded')
    
    let nickname = localStorage.getItem('Nickname')
    console.log(localStorage)
    if(isLogged){
        console.log(nickname)
        profButton.innerHTML = nickname
        Login_Form.classList.add('closed')
        unlog.classList.remove('closed')
        
    }else{
        alert('You are not logged')
        
        
    }
}

unlog.onclick = function(event){
    localStorage.clear()
    console.log(localStorage)
    event.preventDefault()
    Login_Form.classList.remove('closed')
    unlog.classList.add('closed')
    profButton.innerHTML = "Profile"
}



login.onclick = function(event){
    if(nicknameInput.value && passwordInput.value){
        localStorage.setItem('IsLogged', 1)
        localStorage.setItem('Nickname', nicknameInput.value )
        profButton.innerHTML = localStorage.getItem('Nickname')
        Login_Form.classList.add('closed')
        unlog.classList.remove('closed')
    }
    console.log(localStorage)
    event.preventDefault()
}







let profButton = document.getElementById('button2')
let findUserButton = document.getElementById('button1')
let homeButton = document.getElementById('home')

profButton.onclick =function(){
    console.log('klklklklk')
    window.location="profile.html"
}
homeButton.onclick =function(){
    console.log('adasdsadada')
    window.location.href="index.html"
}
findUserButton.onclick =function(){
    console.log('adasdsadada')
    window.location.href="findUser.html"
}


function CreateResultItem(title,year,actorList){
    let resultItem = document.createElement("div")
    resultItem.classList.add("result-item")

    let resultItem1 = document.createElement("div")
    resultItem1.classList.add("result-item1")

    let resultItem2 = document.createElement("div")
    resultItem2.classList.add("result-item2")
    resultItem2.classList.add("closed")


    let titleItem = document.createElement("div")
    titleItem.classList.add("title")
    let addButton = document.createElement("button")
    addButton.classList.add("add")

    let toggleButton = document.createElement("button")
    toggleButton.classList.add("toggle")
    toggleButton.innerHTML = 'More'
    
    resultItem2.innerHTML = '<div class="year">'+year +'</div><ul>'

    for(let key in actorList){
        resultItem2.innerHTML += '<li>' + actorList[key] + '</li>'
    }

    resultItem2.innerHTML+='</ul>'


    addButton.innerHTML = 'Add'
    let p = document.createElement("p")
    p.classList.add("title-name")
    p.innerHTML = title.value
    titleItem.append(p)
    resultItem1.append(titleItem)
    resultItem1.append(addButton)
    resultItem.append(resultItem1)
    resultItem.append(toggleButton)
    resultItem.append(resultItem2)

    return resultItem

}





result.addEventListener('click',function(event){
   
    if(event.target.classList.contains('toggle')){
        let Toggle = event.target;
        Toggle.innerHTML = 'Less'
        let Result2 = Toggle.parentElement.children[2]
        if(Result2.classList.contains('closed')){
            Result2.classList.remove('closed')
            Toggle.innerHTML = 'Less'
        }
        else{
            Result2.classList.add('closed')
            Toggle.innerHTML = 'More'

        }
        console.log(Result2)
        
    }
    

})


