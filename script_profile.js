let find = document.getElementById("find-title")
let findActor = document.getElementById("find-actor")
let title = document.getElementById("content-title")
let result = document.querySelector(".main-result")
let search = document.querySelector(".main-search")

let Login_Form = document.getElementById("Login_Form")
let actorsearch = document.getElementById("byActor")

let SearchToggle = document.getElementById("Toggle-search")

let Page = 1;
let PageAmount = 1;

let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')


let login = document.getElementById('login')
let register = document.getElementById('register')
let nicknameInput = document.getElementById('nickname')
let passwordInput = document.getElementById('password')
let unlog = document.getElementById('unlog')


let isLogged = localStorage.getItem('IsLogged')
window.onload=function(event){
    event.preventDefault()
    
    if(localStorage.getItem('Nickname')=='Admin'){
        CreateButton.classList.remove('closed')
    }
    let nickname = localStorage.getItem('Nickname')
    console.log(localStorage)
    if(isLogged){
        console.log(nickname)
        profButton.innerHTML = nickname
        Login_Form.classList.add('closed')
        unlog.classList.remove('closed')


        result.innerHTML=''
        let UID = localStorage.getItem('UID')
        console.log(UID)
        let userUrl = 'https://localhost:7117/api/user/'+ UID
        fetch(userUrl).then(res=>res.json()).then(data=>{
            
            console.log(data)
            
            for(let key in data.contentViewModels){
                
                
                result.append(CreateResultItem2(data.contentViewModels[key].name, data.contentViewModels[key].releaseDate.substring(0,4), data.contentViewModels[key].id))
            }            
        })
        
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
    result.innerHTML=''
}



login.onclick = function(event){
    const regex = /^(?!.*#$).*$/;

    if(nicknameInput.value && passwordInput.value && regex.test(nicknameInput.value) && regex.test(passwordInput.value)){
        
        fetch('https://localhost:7117/api/user/login?NickName='+ nicknameInput.value+'&Password='+passwordInput.value).then(res =>res.json()).then(data=>{
            console.log(data)
            
            if(data.id){
                localStorage.setItem('IsLogged', 1)
                localStorage.setItem('Nickname', nicknameInput.value )
                localStorage.setItem('UID',data.id)
                profButton.innerHTML = localStorage.getItem('Nickname')
                Login_Form.classList.add('closed')
                unlog.classList.remove('closed')
                let userUrl = 'https://localhost:7117/api/user/'+ data.id
                fetch(userUrl).then(res=>res.json()).then(data=>{
                
                    console.log(data)
                    for(let key in data.contentViewModels){
                        result.append(CreateResultItem2(data.contentViewModels[key].name, data.contentViewModels[key].releaseDate.substring(0,4), data.contentViewModels[key].id))
                     }
                })
            }
            else{
                alert("Something went wrong!")
            } 
        })
        result.innerHTML=''

        let UID = localStorage.getItem('UID')
    
    }
    else{
        alert("Forbidden symbol in password or nickname!")
    }

    event.preventDefault()
}
register.onclick = function(event){
    console.log('jopa')
    if(nicknameInput.value && passwordInput.value&& regex.test(nicknameInput.value) && regex.test(passwordInput.value)){
        fetch('https://localhost:7117/api/user/createUser', 
            {
                method: 'POST',
                headers:{
                    'accept':'*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"nickName":nicknameInput.value, "dateOfBirth": "2003-04-03T14:48:05.705Z","password":passwordInput.value})
            }).then(response=>response.json()).then(data=>{
                if(Number.isInteger(data)&&data){
                    console.log(data)
                localStorage.setItem('IsLogged', 1)
                localStorage.setItem('Nickname', nicknameInput.value )
                localStorage.setItem('UID',data)
                profButton.innerHTML = localStorage.getItem('Nickname')
                Login_Form.classList.add('closed')
                unlog.classList.remove('closed')
                }
                else{
                    alert("Something went wrong!")
                }

            })
    
    }
    else{
        alert("Forbidden symbol in password or nickname!")
    }   
    event.preventDefault()
}




let profButton = document.getElementById('button2')
let findUserButton = document.getElementById('button1')
let CreateButton = document.getElementById('button3')
let homeButton = document.getElementById('home')

profButton.onclick =function(){
    window.location="profile.html"
}
homeButton.onclick =function(){
    window.location.href="index.html"
}
findUserButton.onclick =function(){

    window.location.href="findUser.html"
}
CreateButton.onclick =function(){

    window.location.href="Create.html"
}


function CreateResultItem2(title,year,Cont_id){//create content element
    

    let resultItem = document.createElement("div")
    resultItem.classList.add("result-item")

    let resultItem1 = document.createElement("div")
    resultItem1.classList.add("result-item1")

    let resultItem2 = document.createElement("div")
    resultItem2.classList.add("result-item2")
    resultItem2.classList.add("closed")


    let titleItem = document.createElement("div")
    titleItem.classList.add("title")
    let removeButton = document.createElement("button")
    removeButton.classList.add("remove")

    let toggleButton = document.createElement("button")
    toggleButton.classList.add("toggle")
    toggleButton.innerHTML = 'More'
    
    resultItem2.innerHTML = '<div class="year">'+year +'</div> <div class=actors1></div><div class=genres_item></div><div class=category_item></div>'

    resultItem2.setAttribute('CID', Cont_id)

    removeButton.innerHTML = 'Remove'
    let p = document.createElement("p")
    p.classList.add("title-name")
    p.innerHTML = title
    titleItem.append(p)
    resultItem1.append(titleItem)
    resultItem1.append(removeButton)
    resultItem.append(resultItem1)
    resultItem.append(toggleButton)
    resultItem.append(resultItem2)

    return resultItem

}





result.addEventListener('click',function(event){
   
    if(event.target.classList.contains('toggle')){//toggle additional content on content item
        let Toggle = event.target;
        Toggle.innerHTML = 'Less'
        
        let Item2 = Toggle.parentElement.children[2]
        let AC = Item2.children[1]
        let GC = Item2.children[2]
        let CC = Item2.children[3]
        AC.innerHTML=''
        GC.innerHTML=''
        CC.innerHTML=''
        let CID = Item2.getAttribute('cid')
        let actorsUrl = 'https://localhost:7117/api/content/'+ CID
        fetch(actorsUrl).then(res=>res.json()).then(data=>{
        
            AC.innerHTML+='<ul>'
            GC.innerHTML+='<ul>'
            CC.innerHTML+='<p>'
            for(let k in data.actorsViewModels){
                AC.innerHTML+='<li>'+data.actorsViewModels[k].name+'</li>'
                
            }
            for(let k in data.genreViewModels){
                GC.innerHTML+='<li>'+data.genreViewModels[k].name+'</li>'
                
            }
            CC.innerHTML+=data.contentCategory

            AC.innerHTML+='</ul>'
            GC.innerHTML+='</ul>'
            CC.innerHTML+='</p>'
        
            
        })

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
    if(event.target.classList.contains('remove')){
        let LSisLogged = localStorage.getItem('IsLogged')
        if(LSisLogged == 1){
            let Add = event.target;
            let Title = Add.closest('.result-item').children
            let name = Title[0].children[0].children[0].innerHTML
            let CID = Add.closest('.result-item').children[2].getAttribute('cid')
            console.log(CID)
            fetch('https://localhost:7117/api/user/deleteContent', 
            {
                method: 'POST',
                headers:{
                    'accept':'*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"userId":localStorage.getItem('UID'), "contentId":CID})
            }).then(response=>{
                if(response.status!=200){
                    console.log('Error!')
                }
            })
            location.reload()
            Add.parentElement.parentElement.style.border = "1px solid red"
            setTimeout(()=>{Add.parentElement.parentElement.style.border = "none"},300);
            console.log(name)
        }
        else{
            alert('you are not logged')
        }
        
    }
})






