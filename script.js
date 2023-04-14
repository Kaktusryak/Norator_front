let find = document.getElementById("find-title")
let findActor = document.getElementById("find-actor")
let title = document.getElementById("content-title1")
let title2= document.getElementById("content-title2")
let result = document.querySelector(".main-result")
let search = document.querySelector(".main-search")

let titlesearch = document.getElementById("byTitle")
let actorsearch = document.getElementById("byActor")

let SearchToggle = document.getElementById("Toggle-search")

//let item1 = '<div class="result-item"><div class="title"><p>'
//let item2 = '</p></div><button class="add">Add</button></div>'

//let actorList = ['chuk','gek','cheburek']




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



function CreateResultItem(title,year,Cont_id){//create content element
    

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
    
    




    resultItem2.innerHTML = '<div class="year">'+year +'</div> <div class=actors></div><div class=genres_item></div><div class=category_item></div>'
    
    
    resultItem2.setAttribute('CID', Cont_id)

    addButton.innerHTML = 'Add'
    let p = document.createElement("p")
    p.classList.add("title-name")
    p.innerHTML = title
    titleItem.append(p)
    resultItem1.append(titleItem)
    resultItem1.append(addButton)
    resultItem.append(resultItem1)
    resultItem.append(toggleButton)
    resultItem.append(resultItem2)

    return resultItem

}






find.onclick = function(event){//searching for content by title name
    result.innerHTML=''
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    let url = 'https://localhost:7117/api/content/getall?FilterParam='+title.value +'&PageNumber=1&PageSize=20'
    //let mapActors
    
    //const actorList =[];
    fetch(url)
        .then(res=>res.json()).then(data => {
            //console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem(data.entities[key].name, data.entities[key].releaseDate.substring(0,4), data.entities[key].id))
            }
        } )
    
    //let resultItem = CreateResultItem(title,2003,actorList)


    //result.append(resultItem)
    
}
findActor.onclick = function(event){//searching for content by actor name
    

    console.log(title2.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    result.innerHTML=''
    console.log(title2.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    let url = 'https://localhost:7117/api/content/getall?ActorName='+title2.value +'&PageNumber=1&PageSize=20'
    //let mapActors
    
    //const actorList =[];
    fetch(url)
        .then(res=>res.json()).then(data => {
            //console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem(data.entities[key].name, data.entities[key].releaseDate.substring(0,4), data.entities[key].id))
            }
        } )
    console.log(url)
    
    //let resultItem = CreateResultItem(title,2003,actorList)


    //result.append(resultItem)
    


    //result.innerHTML="<div>Action is not added yet</div>"
    
}

result.addEventListener('click',function(event){
    if(event.target.classList.contains('add')){//adding content to user favorites
        let LSisLogged = localStorage.getItem('IsLogged')
        if(LSisLogged == 1){
            let Add = event.target;
            let Title = Add.closest('.result-item').children
            let name = Title[0].children[0].children[0].innerHTML
            let CID = Add.closest('.result-item').children[2].getAttribute('cid')
            console.log(CID)
            fetch('https://localhost:7117/api/user/addContent', 
            {
                method: 'POST',
                headers:{
                    'accept':'*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"userId":localStorage.getItem('UID'), "contentId":CID})
            }).then(response=>{
                if(response.status!=200){
                    console.log('pasasi')
                }
            })

            Add.parentElement.parentElement.style.border = "1px solid greenyellow"
            setTimeout(()=>{Add.parentElement.parentElement.style.border = "none"},300);
            console.log(name)
        }
        else{
            alert('you are not logged')
        }
        
    }
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
            //console.log(data.actorsViewModels)
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
    

})

SearchToggle.onclick = function(event){//toggle searching parameters from actor to title and back
    console.log('aaaaaaaaaaaaaaaaaaaa')
    if(actorsearch.classList.contains('closed')){
        actorsearch.classList.remove('closed');
        titlesearch.classList.add('closed');
        SearchToggle.innerHTML = "<p class='green'>To Search by Title</p>";
    }else{
        actorsearch.classList.add('closed');
        titlesearch.classList.remove('closed');
        SearchToggle.innerHTML = "<p class='red'>To Search by Actor</p>"
    }
    
    
    event.preventDefault()
}


let isLogged = localStorage.getItem('IsLogged')
window.onload=function(event){
    event.preventDefault()
    //alert('Loaded')
    
    let nickname = localStorage.getItem('Nickname')
    console.log(localStorage)
    if(isLogged){
        console.log(nickname)
        profButton.innerHTML = nickname
        
    }else{
        alert('You are not logged')
        
        
    }
    fetch('https://localhost:7117/api/content/gettop20')
    .then(res=>res.json()).then(data => {
        console.log(data)
        for(let key in data){
            //console.log(data.entities[key].name)
            
            //let actorList=new Array()
            
            
            result.append(CreateResultItem(data[key].name, data[key].releaseDate.substring(0,4), data[key].id))
        }
    } )



}
