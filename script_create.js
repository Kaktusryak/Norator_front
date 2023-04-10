let result = document.querySelector(".main-result")
let msearch = document.getElementsByClassName('main-search1')


let profButton = document.getElementById('button2')
let findUserButton = document.getElementById('button1')
let CreateButton = document.getElementById('button3')
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



let genres = document.getElementById('genres')
let categories = document.getElementById('categories')
window.onload=function(event){
    
    fetch('https://localhost:7117/api/genre/getall').then(res=>res.json()).then(data=>{
        //console.log(data.actorsViewModels)
        console.log(data)
        
        for(let key in data.entities){
            console.log(data.entities[key].name)
            //console.log(data.entities[key].name)
            
            //let actorList=new Array()
            genres.innerHTML+='<input type="checkbox" name="genre" class="genre" value="'+ data.entities[key].id+'"><label for="'+data.entities[key].id+'">'+data.entities[key].name+'</label> <br>'
            
            
        }
        
    
        
    })
    
    fetch('https://localhost:7117/api/content/getall?PageNumber=1&PageSize=20')
        .then(res=>res.json()).then(data => {
            console.log(data.entities)
            for(let key in data.entities){
                //console.log(data.entities[key].name)
                
                //let actorList=new Array()
                
                
                result.append(CreateResultItem3(data.entities[key].name, data.entities[key].id))
            }
            if(data.hasNext==false){
                next.classList.add('closed')
            }
            if(data.hasPrevious==false){
                prev.classList.add('closed')
            }
        } )    



    // fetch('https://localhost:7117/api/genre/getall').then(res=>res.json()).then(data=>{
    //     //console.log(data.actorsViewModels)
    //     console.log(data)
        
    //     for(let key in data.entities){
    //         console.log(data.entities[key].name)
    //         //console.log(data.entities[key].name)
            
    //         //let actorList=new Array()
    //         genres.innerHTML+='<input type="checkbox" name="genre" class="genre" value="'+ data.entities[key].id+'"><label for="'+data.entities[key].id+'">'+data.entities[key].name+'</label> <br>'
            
            
    //     }
        
    
        
    // })

}



let Create_Button=document.getElementById('Create_button')
Create_Button.onclick=function(event){
    event.preventDefault()
    let name = document.getElementById("Create_title").value
    let year = document.getElementById("Create_year").value
    let genres_list = document.querySelectorAll(".genre")
    let checked_arr=[]
    for(let key in genres_list){
        if(genres_list[key].checked){
            checked_arr.push(genres_list[key].getAttribute('value'))
        }
    }
    console.log(genres_list)
    console.log(checked_arr)



    fetch('https://localhost:7117/api/content', 
    {
        method: 'POST',
        headers:{
            'accept':'*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name":name, "releaseDate":year, "contentCategoryId":1, "genres":checked_arr, "actors":[]})
    }).then(response=>{
        if(response.status!=200){
            console.log('pasasi')
        }
    })

}















//////////////////////////////





function CreateResultItem3(title,content_id){//create content element
    

    let resultItem = document.createElement("div")
    resultItem.classList.add("result-item")

    let resultItem1 = document.createElement("div")
    resultItem1.classList.add("result-item1")

    let resultItem2 = document.createElement("div")
    resultItem2.classList.add("result-item2")
    resultItem2.classList.add("closed")


    let titleItem = document.createElement("div")
    titleItem.classList.add("title")
    let editButton = document.createElement("button")
    editButton.classList.add("edit")
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")

   
    




    //resultItem2.innerHTML = '<div class="year">'+year +'</div> <div class=actors></div>'
    
    
    resultItem1.setAttribute('Cid', content_id)

    editButton.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'
    let p = document.createElement("p")
    p.classList.add("title-name")
    p.innerHTML = title
    titleItem.append(p)
    resultItem1.append(titleItem)
    resultItem1.append(editButton)
    resultItem1.append(deleteButton)
    resultItem.append(resultItem1)
    
    resultItem.append(resultItem2)

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
                
                
                result.append(CreateResultItem3(data.entities[key].nickName, data.entities[key].id))
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
                
                
                result.append(CreateResultItem3(data.entities[key].nickName, data.entities[key].id))
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
                
                
                result.append(CreateResultItem(data.contentViewModels[key].name, data.contentViewModels[key].releaseDate.substring(data.contentViewModels[key].releaseDate.length-4), data.contentViewModels[key].id))
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
    if(event.target.id=='Update_button'){
        event.preventDefault()
        let update = event.target;
        let upper = update.parentElement.parentElement
        let name = update.parentElement.children[0].value
        let year = update.parentElement.children[1].value
        let genres_list = upper.querySelectorAll('.genre')
        let actors_list = upper.querySelectorAll('.actor')
        let id = update.parentElement.parentElement.parentElement.children[0].getAttribute('cid')
        console.log(genres_list)
        let checked_arr=[]
        for(let key in genres_list){
            if(genres_list[key].checked){
                checked_arr.push(genres_list[key].getAttribute('value'))
                //console.log(genres_list[key].getAttribute('value') +' g')
            }
        }
        
        
        let checked_arrActors=[]
        for(let key in actors_list){
            if(actors_list[key].checked){
                checked_arrActors.push(actors_list[key].getAttribute('value'))
                //console.log(actors_list[key].getAttribute('value') +' a')
            }
        }
        console.log(name)
        console.log(year)
        console.log(id)
        console.log(checked_arr)
        console.log(checked_arrActors)

        fetch('https://localhost:7117/api/content', 
        {
            method: 'PUT',
            headers:{
                'accept':'*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name":name, "releaseDate":year,"id": id,"contentCategoryId":1, "actorsId":checked_arr, "genresId":checked_arrActors})
        }).then(response=>{
            if(response.status!=200){
                console.log('pasasi')
                
            }
        })
    }
    if(event.target.classList.contains('edit')){//toggle additional content on content item
        let Edit = event.target;
        
        
        let Item2 = Edit.parentElement.parentElement.children[1]
        Item2.classList.remove('closed')
        Item2.innerHTML = ' <form action="" id="Create_content_form" name="Create"><input name="Title"type="text" id="Create_title" class="text"><input name="Year"type="date" id="Create_year" class="text"> <div id="categories"></div><div class="genres"></div><div class="actors"></div><input type="submit" value="Update" id="Update_button">  </form>'
        console.log(Item2)
        Edit.classList.add('closed')
//genres
        fetch('https://localhost:7117/api/genre/getall').then(res=>res.json()).then(data=>{
        //console.log(data.actorsViewModels)
        console.log(data)
        let genres = Edit.parentElement.parentElement.children[1].children[0].children[3]
        console.log(genres)
        for(let key in data.entities){
            console.log(data.entities[key].name)
            //console.log(data.entities[key].name)
            
            //let actorList=new Array()
            genres.innerHTML+='<input type="checkbox" name="genre" class="genre" value="'+ data.entities[key].id+'"><label for="'+data.entities[key].id+'">'+data.entities[key].name+'</label> <br>'
            
            
        }
        
        
    
        
        })
//categ
        // fetch('https://localhost:7117/api/genre/getall').then(res=>res.json()).then(data=>{
        // //console.log(data.actorsViewModels)
        // console.log(data)
        // let genres = Edit.parentElement.parentElement.children[1].children[0].children[2]
        // console.log(genres)
        // for(let key in data.entities){
        //     console.log(data.entities[key].name)
        //     //console.log(data.entities[key].name)
            
        //     //let actorList=new Array()
        //     genres.innerHTML+='<input type="checkbox" name="genre" class="genre" value="'+ data.entities[key].id+'"><label for="'+data.entities[key].id+'">'+data.entities[key].name+'</label> <br>'
            
            
        // }
        
        
    
        
        // })
//actors
        fetch('https://localhost:7117/api/actor/getall').then(res=>res.json()).then(data=>{
        //console.log(data.actorsViewModels)
        console.log(data)
        let actors = Edit.parentElement.parentElement.children[1].children[0].children[4]
        console.log(genres)
        for(let key in data.entities){
            console.log(data.entities[key].name)
            //console.log(data.entities[key].name)
            
            //let actorList=new Array()
            actors.innerHTML+='<input type="checkbox" name="genre" class="actor" value="'+ data.entities[key].id+'"><label for="'+data.entities[key].id+'">'+data.entities[key].name+'</label> <br>'
            
            
        }
        
        
    
        
        })
        
        


       
        
        
        
        
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




