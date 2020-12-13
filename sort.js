let items = [];
let color1 = "#88f"
let color2 = "#f88"
let color3 = "#8f8"
let color4 = "#f8f"

var body = document.getElementById("gradient");
var arrayId = document.getElementById('sortvalues');
var btnId = document.getElementById('sorter');
function getHeight(a){
    return Math.ceil(a/2)
}
function getTime(sorting,e){
    var msf= 10
    
    switch (sorting) {
        case "bubble":
            msf = Math.floor(500/e )
            break;
        case "insertion":
            msf = Math.ceil(500/e )
            break; 
        case "merge":
            msf = Math.ceil(500/e )
            break; 
        case "quick":
            msf = Math.ceil(500/e )
            break;
        case "selection":
            msf = Math.ceil(1000/e )
            break;
        }
    return msf;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function mergeSort (unsortedArray) {
    
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    );
}
async function selectionSort(sorting){
    var c = document.getElementById("sort-elem-container").childNodes.length;
    var allNodes = document.getElementById("sort-elem-container").childNodes;
    var msf = getTime(sorting,c);
    var a,b;
    for (var i = 0; i < c-1; i++) {
        var min_idx = i;
        for (var j = i+1; j < c;j++){
            a = parseInt(allNodes[j].innerHTML);
            b = parseInt(allNodes[min_idx].innerHTML);
            
            //allNodes[min_idx].style.background = color3;
            if( a<b ){
                allNodes[j].style.background = color3;
                min_idx = j;
            }
            
        }
        a = parseInt(allNodes[i].innerHTML);
        b = parseInt(allNodes[min_idx].innerHTML);

        await sleep(msf*2);
        allNodes[min_idx].style.background = color2;
        allNodes[i].style.background = color2;
        allNodes[min_idx].innerHTML= a
        allNodes[i].innerHTML= b

        allNodes[min_idx].style.height = getHeight(a)+"px";
        allNodes[i].style.height = getHeight(b)+"px";
    }
    for(let i = 0; i<c; i++) {
        allNodes[i].style.background = color3;
    }
    btnId.disabled = false;
    arrayId.disabled = false;
}
async function insertionSort(sorting) {
    var c = document.getElementById("sort-elem-container").childNodes.length;
    var allNodes = document.getElementById("sort-elem-container").childNodes;

    var i, key, j;  
    var msf = getTime(sorting,c)
    for (i = 1; i < c; i++) 
    {  
        key = parseInt(allNodes[i].innerHTML);  
        j = i - 1;  
        while (j >= 0 && parseInt(allNodes[j].innerHTML) > key) 
        {  
            allNodes[j+1].style.background = color3;
            allNodes[j].style.background = color3;
            await sleep(msf*2);
            var a = parseInt(allNodes[j].innerHTML);
            allNodes[j+1].style.background = color2;
            allNodes[j+1].innerHTML= a
            allNodes[j+1].style.height = getHeight(a)+"px";
            j = j - 1;  
        }  
        await sleep(msf);
        allNodes[j+1].innerHTML = key;
        allNodes[j+1].style.height = getHeight(key)+"px";
        allNodes[i].style.background = color4;
    }           
    console.log()
    for(let i = 0; i<c; i++) {
        allNodes[i].style.background = color3;
    }
    btnId.disabled = false;
    arrayId.disabled = false;
}
async function bubbleSort(sorting){
    var c = document.getElementById("sort-elem-container").childNodes.length;
    var allNodes = document.getElementById("sort-elem-container").childNodes;
    
    let j = 0
    var msf = getTime(sorting,c)
    console.log(msf)
    for(let i = 0; i<c; i++) {
        
        for(j = 0; j < c-i-1; j++)
        {
            var a = parseInt(allNodes[j].innerHTML);
            var b = parseInt(allNodes[j+1].innerHTML);
            
            allNodes[j+1].style.background = color3;
            allNodes[j].style.background = color3;
            
            if (a > b){
                await sleep(msf*2);
                allNodes[j+1].style.background = color2;
                allNodes[j].style.background = color2;
                allNodes[j+1].innerHTML= a
                allNodes[j].innerHTML= b

                allNodes[j+1].style.height = getHeight(a)+"px";
                allNodes[j].style.height = getHeight(b)+"px";
                // allNodes[j+1].replaceWith(allNodes[j]);
                // allNodes[j].replaceWith(allNodes[j+1]);
                
            }
            await sleep(msf);
            allNodes[j+1].style.background = color1;
            allNodes[j].style.background = color1;
        }
        allNodes[j].style.background = color4;
    }
    for(let i = 0; i<c; i++) {
        allNodes[i].style.background = color3;
    }
    btnId.disabled = false;
    arrayId.disabled = false;
}
function handleSort(){
    var sorting = document.getElementById('sortselection').value;
    
    
    btnId.disabled = true;
    arrayId.disabled = true;
    
    switch (sorting) {
        case "bubble":
            bubbleSort(sorting);
            
            break;
        case "insertion":
            insertionSort(sorting);
            break; 
        case "selection":
            selectionSort(sorting);
            break; 
        case "merge":
            alert("coming soon");//mergeSort(sorting)
            break; 
        default:
            alert("coming soon");
        // case "quick":
        //     bubbleSort()
        //     break;
        }
       
}
function addSortElem(){
    console.log(items)
    var container = document.getElementById("sort-elem-container");
    container.innerHTML = '';
    offsetWidth = container.offsetWidth;
    offsetHeight = container.offsetHeight;
    widthElem = Math.floor(offsetWidth/items.length)-2;
    items.forEach((item)=>{
        var elem = document.createElement("span");
        elem.innerHTML=item
        elem.setAttribute("class","sort-elem");
        elem.setAttribute("style", "height:"+getHeight(item)+"px;width:"+widthElem+"px");
        container.appendChild(elem);
    })
    
}
function showVal(e){
    console.log(e)
    var ids = document.getElementById('sortview');
    console.log(ids);
    items=[];
    for(let i = 0; i<e; i++) {
        temp = Math.floor(Math.random()*1000)
        items.push(temp);
    }
    addSortElem();
    
}

function randomColor(){ //the addition of '000000' and the slice() at the end will ensure that you'll always get 6digits
	return ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
}
function randomGradient(){
	body.style.background = 
	"linear-gradient(to right, "
		+ '#' + randomColor()
		+ ", "
		+ '#' + randomColor()
		+ ")"; 
	
}

arrayId.addEventListener("change", randomGradient);