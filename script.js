let find = document.getElementById("find-title")
let findActor = document.getElementById("find-actor")
let title = document.getElementById("content-title")
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



function CreateResultItem(title,year,actorList,Cont_id){
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






find.onclick = function(event){
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    let url = 'https://localhost:7117/api/content/getall?FilterParam='+title.value +'&PageNumber=1&PageSize=20'
    
    let actorList =[]
    fetch(url)
        .then(res=>res.json()).then(data => {
            //console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                let actorsUrl = 'https://localhost:7117/api/actor/'+ data.entities[key].id
                fetch(actorsUrl).then(res=>res.json()).then(data=>{
                    actorList[0]=data.name
                    console.log(actorList)
                    
                })
                result.append(CreateResultItem(data.entities[key].name, data.entities[key].releaseDate,actorList, data.entities[key].id))
            }
        } )
    
    //let resultItem = CreateResultItem(title,2003,actorList)


    //result.append(resultItem)
    
}
findActor.onclick = function(event){
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()

    


    result.innerHTML="<div>Action is not added yet</div>"
    
}

result.addEventListener('click',function(event){
    if(event.target.classList.contains('add')){
        let Add = event.target;
        let Title = Add.closest('.result-item').children
        let name = Title[0].children[0].children[0].innerHTML
        Add.parentElement.parentElement.style.border = "1px solid greenyellow"
        setTimeout(()=>{Add.parentElement.parentElement.style.border = "none"},300);
        
        console.log(name)
    }
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

SearchToggle.onclick = function(event){
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

