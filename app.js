const card=document.getElementById('cardMain');
const searchTitles=document.getElementById('searchTitles');
const searchSection=document.getElementById('searchSection');
const clear=document.getElementById('clear');
const searchNav=document.getElementById('search');

//////////////  generate chart titles /////////////////////////

async function chartdata(){
    const fechdata=await fetch('./data.json');
    var data=await fechdata.json();
    card.innerHTML=data.map(x=>generateCards(x)).join('')
    var option =Array.from(document.getElementsByClassName("searchOptions"));
    var isCard =Array.from(document.getElementsByClassName("isCard"));
    var languages =Array.from(document.getElementsByClassName("languages"));
    var tools =Array.from(document.getElementsByClassName("tools"));
    var searchItemsTitles=[];
    var smallArrayToAdd=[];
    var languagesArray=[]; 

    /////////////// sort options /////////////////////////

    for(let i=0;i<isCard.length;i++)
    {
        for(let j=0;j<option.length;j++)
        {
            const title=(option[j].firstChild.innerText)
            if(option[j].parentElement.parentElement.parentElement.parentElement==isCard[i])
            {
                smallArrayToAdd.push(title)
            }
        }
        languagesArray.push(smallArrayToAdd) 
        smallArrayToAdd=[];
    }

    /////////////// option titles addEventListener/////////////////////////

    option.forEach(element => {
        element.addEventListener("click",search);
        function search(){
            searchNav.style.display="block";
            var saveTitle=(element.innerText)
            var counter1=0;
            for(let i=0;i<searchItemsTitles.length;i++)
            {
                searchItemsTitles[i]==saveTitle ? counter1++ : null
            }
            counter1==0 ? searchItemsTitles.push(saveTitle) : null;
            searchTitles.style.display="flex";

            //////////////// search add title/////////////////////////

            const searchh=document.createElement("div");
            searchh.innerHTML=`<div class="button-search">
            ${element.innerHTML}
            <button class="btn" ><img src="./images/icon-remove.svg" alt="remove"></button>
            </div>`;
            counter1==0 ? (searchSection.appendChild(searchh)) : null;

            //////////////// search titles forEach/////////////////////////

            var btn =Array.from(document.getElementsByClassName("btn"));
            var filtered=[];
            btn.forEach((item,itemKey) => {
                item.addEventListener("click",deleteItem);
                item.addEventListener("mouseover", func, false);
                item.addEventListener("mouseout", func1, false);


                //////////////// hover functions/////////////////////////

                function func()
                {  
                    item.setAttribute("style", "background-color:black;")
                }

                function func1()
                {  
                    item.setAttribute("style", "background-color:hsl(180, 29%, 50%);")
                }

                //////////////// deleteItem functions/////////////////////////

                function deleteItem(){
                    const deleteTilte=item.parentElement.firstElementChild.innerHTML;
                    (item.parentElement.parentElement).remove()
                    
                    for(let i=0;i<searchItemsTitles.length;i++)
                    {
                        searchItemsTitles[i]!=deleteTilte ? filtered.push(searchItemsTitles[i]) : null
                    }
                    searchItemsTitles=[];
                    searchItemsTitles=filtered.map(x=>x);
                    filtered=[];
                    showCard();
                    };
 
            });

            ////////////// show each card /////////////////////////

            function showCard(){
                searchItemsTitles.length==0 ? searchNav.style.display="none" : null
                for(let i=0;i<isCard.length;i++)
                {
                    var counter=0;
                    for(let k=0;k<searchItemsTitles.length;k++)
                    {
                        for(let j=0;j<languagesArray[i].length;j++)
                        {
                            if(searchItemsTitles[k]==languagesArray[i][j])
                            {
                                counter++;
                            }
                        } 
                    }
                    counter==searchItemsTitles.length ? isCard[i].style.display="block" : isCard[i].style.display="none";
                }
            }
            showCard();
        }
    });

////////////// clear function /////////////////////////

clear.onclick=function()
{
    isCard.forEach(element => {
        element.style.display="block";
        searchNav.style.display="none";
        searchSection.innerHTML="";
        searchItemsTitles=[];
    });
} 
}


chartdata();

////////////// generateCards /////////////////////////

function generateCards(x)
{
    
    return `  
    ${((x.new && x.featured)==true) ? `<div class="cardGreenBackground isCard">` : `<div class="cardWhiteBackground isCard">`}
    ${((x.new && x.featured)==true) ? `<div class="cardMainNewFeatured"> ` : `<div class="cardMain"> `}
    <div class="image-details">
    <img src="${x.logo}" alt="account" class="image">
    <div class="title">
    <div class="topTitle">
    <p class="jobDescription">${x.company}</p>
    ${x.new==true ? `<p class="new">NEW!</p>` : ""}
    ${x.featured==true ? `<p class="featured">FEATURED</p>` : ""}
    </div>
    <p class="job">${x.position}</p>
    <div class="details">
    <p>${x.postedAt}</p>
    <p>${x.contract}</p>
    <p>${x.location}</p>
    </div>
    </div>
    </div>
    <div class="abilities">
    <div class="languages">
    <button class="searchOptions"><p>${x.role}</p></button>
    <button class="searchOptions"><p>${x.level}</p></button>
    ${x.languages.map(e=>`<button class="searchOptions"><p class="option">${e}</p></button>`).join('')}
    </div>
    <div class="tools">
    ${x.tools.map(e=>`<button class="searchOptions"><p class="option">${e}</p></button>`).join('')}
    </div>
    </div>
    </div>
    </div>
    `
    
} 



