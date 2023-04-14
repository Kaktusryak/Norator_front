let findByUser = document.getElementById("find-user")
let findActor = document.getElementById("find-actor")
let title = document.getElementById("content-title")
let result = document.querySelector(".main-result")
let search = document.querySelector(".main-search")

let titlesearch = document.getElementById("byTitle")
let actorsearch = document.getElementById("byActor")

let SearchToggle = document.getElementById("Toggle-search")

let item1 = '<div class="result-item"><div class="title"><p>'
let item2 = '</p></div><button class="add">Add</button></div>'
let Page = 1;
let PageAmount = 1;
//let actorList = ['chuk','gek','cheburek']

let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')



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
function CreateResultItem1(title,User_id){//create content element
    

    let resultItem = document.createElement("div")
    resultItem.classList.add("result-item")

    let resultItem1 = document.createElement("div")
    resultItem1.classList.add("result-item1")

    let resultItem2 = document.createElement("div")
    resultItem2.classList.add("result-item2")
    resultItem2.classList.add("closed")


    let titleItem = document.createElement("div")
    titleItem.classList.add("title")
    let moreButton = document.createElement("button")
    moreButton.classList.add("more")

   
    




    //resultItem2.innerHTML = '<div class="year">'+year +'</div> <div class=actors></div>'
    
    
    resultItem1.setAttribute('UID', User_id)

    moreButton.innerHTML = 'More'
    let p = document.createElement("p")
    p.classList.add("title-name")
    p.innerHTML = title
    titleItem.append(p)
    resultItem1.append(titleItem)
    resultItem1.append(moreButton)
    resultItem.append(resultItem1)
    
    //resultItem.append(resultItem2)

    return resultItem

}

prev.onclick = function(event){
    if(Page>1){
        Page--
    }
    next.classList.remove('closed')
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    //if(localStorage.getItem('id'){
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    result.innerHTML=''
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    let url = 'https://localhost:7117/api/content/getall?UserName='+title.value +'&PageNumber='+Page+'&PageSize='+PageAmount
    //let mapActors
    
    //const actorList =[];
    fetch(url)
        .then(res=>res.json()).then(data => {
            //console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem1(data.entities[key].nickName, data.entities[key].id))
            }
            
        } )    
    //}
    //let resultItem = CreateResultItem(title,2003,actorList)


    //result.append(resultItem)
    
}
next.onclick = function(event){
    Page++;
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    //if(localStorage.getItem('id'){
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    result.innerHTML=''
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    let url = 'https://localhost:7117/api/content/getall?UserName='+title.value +'&PageNumber='+Page+'&PageSize='+PageAmount
    //let mapActors
    
    //const actorList =[];
    fetch(url)
        .then(res=>res.json()).then(data => {
            //console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem1(data.entities[key].nickName, data.entities[key].id))
            }
            console.log(data)
            if(data.hasNext==false){
                next.classList.add('closed')
            }
        } )   
     
    //}
    //let resultItem = CreateResultItem(title,2003,actorList)


    //result.append(resultItem)
    
}

findByUser.onclick = function(event){
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    //if(localStorage.getItem('id'){
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    result.innerHTML=''
    console.log(title.value)
    //result.innerHTML = title.value;
    event.preventDefault()
    let url = 'https://localhost:7117/api/user/getall?FilterParam='+title.value+'&PageNumber=1&PageSize=20'
    //let mapActors
    
    const actorList =[];
    fetch(url)
        .then(res=>res.json()).then(data => {
            //console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem1(data.entities[key].nickName, data.entities[key].id))
            }
            if(data.hasNext==false){
                next.classList.add('closed')
            }
            if(data.hasPrevious==false){
                prev.classList.add('closed')
            }
        } )    
}
    //let resultItem = CreateResultItem(title,2003,actorList)


    //result.append(resultItem)
    



result.addEventListener('click',function(event){
    if(event.target.classList.contains('more')){//toggle additional content on content item
        let More = event.target;
        result.innerHTML=''
        result.innerHTML=`<h2>You are watching ${More.parentElement.children[0].innerText} content</h2>`
        
        //Toggle.innerHTML = 'Less'
        
        let Item = More.parentElement
        

        //AC.innerHTML=''
        let UID = Item.getAttribute('uid')
        let userUrl = 'https://localhost:7117/api/user/'+ UID
        fetch(userUrl).then(res=>res.json()).then(data=>{
            //console.log(data.actorsViewModels)
            console.log(data)
            for(let key in data.contentViewModels){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem(data.contentViewModels[key].name, data.contentViewModels[key].releaseDate.substring(0,4), data.contentViewModels[key].id))
            }
            
        
            
        })

        // let Result2 = Toggle.parentElement.children[2]
        // if(Result2.classList.contains('closed')){
        //     Result2.classList.remove('closed')
        //     Toggle.innerHTML = 'Less'
        // }
        // else{
        //     Result2.classList.add('closed')
        //     Toggle.innerHTML = 'More'

        // }
        //console.log(Result2)
        
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

})




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
}
