var EnableVariationsBtn   = document.getElementById("EnableVariationsBtn");

var VariationSection = document.querySelector(".VariationSection");
EnableVariationsBtn.addEventListener('click' , ()=>{
    VariationSection.classList.toggle("Show");
    if(VariationSection.classList.contains("Show")){
        EnableVariationsBtn.innerHTML="Close";
    }else{
        EnableVariationsBtn.innerHTML="Add variant";
    }
});



var AddVariationOption = document.getElementById("AddVariationOption");
var OpationContainer = document.querySelector(".OpationContainer");

var AddOptionBtn = document.querySelector(".AddOptionBtn");
var OptionsRow = document.querySelector(".OptionsRow");
var SingleOnly = true;


var ColorCheckBox = document.querySelector(".ColorCheckBox");
var SizeCheckBox = document.querySelector(".SizeCheckBox");
var ColorVar = document.querySelector(".ColorVar");
var SizeVar = document.querySelector(".SizeVar");
var SaveVariationsItems  = document.getElementById("SaveVariationsItems");

var Colors=[];

var LimitNumOfOptions = 2;
var NumOfCurrentOptions = 1;

AddOptionBtn.addEventListener('click',()=>{

            
            var nextEle = AddOptionBtn.parentElement;
            var PrevParent = nextEle.previousElementSibling;
            var PrevOpt = PrevParent.previousElementSibling;
            var PrvSelectedVar = PrevOpt.querySelector('.VarList').value;
            
            var PrevInputValue = PrevParent.querySelector('.OptionInput');
            
            

            var OptionsValuesRow = nextEle.nextElementSibling.querySelector(".row");
            
                if(PrevInputValue.value.split(' ').join('')!=""&&Colors.includes(PrevInputValue.value)==false){
                    OptionsValuesRow.innerHTML += `<div class="col-lg-2 SizeItem">
                    <input type="text" disabled value="${PrevInputValue.value}">
                    <button class="btn RemoveBtn">x</button>
                </div>`
                PrevInputValue.value="";
                    Colors.push(PrevInputValue.value);
                }
                

                
                OptionsValuesRow.addEventListener('click', (event) => {
                    if (event.target.classList.contains('RemoveBtn')) {
                        const parentColorItem = event.target.closest('.col-lg-2');
                        if (parentColorItem) {
                            parentColorItem.remove();
                            const indexToRemove = Colors.indexOf(parentColorItem.querySelector('input').value);
                            if (indexToRemove !== -1) {
                                Colors.splice(indexToRemove, 1);
                            }
                        }
                    }
                });
            

        });




    AddVariationOption.addEventListener('click', () => {
        SingleOnly=false;
        if(NumOfCurrentOptions< LimitNumOfOptions){

        

        NumOfCurrentOptions++;
        var ClonedOpationContainer = OpationContainer.cloneNode(true);
    
            OptionsRow.appendChild(ClonedOpationContainer);
            var toRemove = OptionsRow.lastElementChild.querySelectorAll(".row .col-lg-12 .OptionsValuesRow .SizeItem");
            toRemove.forEach((e)=>{
                e.remove(); 
            });
            // console.log(OptionsRow.lastElementChild.querySelector(".row .col-lg-12 .OptionsValuesRow").lastChild);
        AddOptionBtn = document.querySelectorAll(".AddOptionBtn");
        
        AddOptionBtn.forEach((AddOpBtn) => {
            AddOpBtn.addEventListener('click' , () => {
                var nextEle = AddOpBtn.closest("div");
                var PrevParent = nextEle.previousElementSibling;
                var PrevOpt = PrevParent.previousElementSibling;
                var PrvSelectedVar = PrevOpt.querySelector('.VarList').value;
                
                var PrevInputValue = PrevParent.querySelector('.OptionInput');
                
                
    
                var OptionsValuesRow = nextEle.nextElementSibling.querySelector(".row");
                
                    if(PrevInputValue.value.split(' ').join('')!=""&&Colors.includes(PrevInputValue.value)==false){
                        OptionsValuesRow.innerHTML += `<div class="col-lg-2 SizeItem">
                        <input type="text" disabled value="${PrevInputValue.value}">
                        <button class="btn RemoveBtn">x</button>
                    </div>`
                    PrevInputValue.value="";
                        Colors.push(PrevInputValue.value);
                    }
                    
    
                    
                    OptionsValuesRow.addEventListener('click', (event) => {
                        if (event.target.classList.contains('RemoveBtn')) {
                            const parentColorItem = event.target.closest('.col-lg-2');
                            if (parentColorItem) {
                                parentColorItem.remove();
                                const indexToRemove = Colors.indexOf(parentColorItem.querySelector('input').value);
                                if (indexToRemove !== -1) {
                                    Colors.splice(indexToRemove, 1);
                                }
                            }
                        }
                    });
                
    
            });
    
        });


    }});
     
    



// function AddOptHandler(AddOpBtn){
//     console.log(AddOpBtn);
// }



var OptionsObj = {
    opts :[],
}

var Saved = false;
var SaveVariations = document.getElementById("SaveVariations");
var table = document.getElementById("Table");
SaveVariations.addEventListener('click' , ()=>{
    if(Saved==false){
        var OpationContainer = document.querySelectorAll(".OpationContainer");
        OpationContainer.forEach((ele)=>{
            var opt = {
                id :"",
                Values:[],
            }
            var id = ele.querySelector(".VarList").value;
            var items=[];
            var Options = ele.querySelectorAll(".SizeItem input");
            Options.forEach((e)=>{
                items.push(e.value);
            });
            opt.id=id;
            opt.Values= items;
            OptionsObj.opts.push(opt);
        });
    
        var Single = false;
        var combinations = [];
        if(OptionsObj.opts[0].Values.length==0){
            OptionsObj.opts[1].Values.forEach((e)=>{
                combinations.push(`${OptionsObj.opts[1].id+"/"+e}`);
            });
    
            Single = true;
    
        }
    
            // if(OptionsObj.opts[1].Values.length == 0){
    
            //     OptionsObj.opts[0].Values.forEach((e)=>{
            //         combinations.push(`${OptionsObj.opts[0].id+"/"+e}`);
            //     });        
                
            //     Single = true;
            // }
     
         
        else{
            
            generateCombinationsWithIds(OptionsObj.opts, 0, [], combinations);
            console.log(combinations);
        }
    
    
    combinations.forEach((ele) => {
        var parts = ele.split('/');
        var firstPart = parts[0];
        var secondPart = parts[2];
        var hiddenInputId = `${firstPart}/${secondPart}`;
        var labelValue = `${parts[1]}/${parts[3]}`;
        if(Single == true || SingleOnly==true ){
            console.log("idoit");
            labelValue =parts[1];
            hiddenInputId = firstPart;
        }
    

        if (!document.getElementById(`${ele}tr`)) {
            table.innerHTML += `<tr class="TableRow Center Flex" id="${labelValue}tr" style="padding:10px;">
                <td  scope="col" style="padding:20px"> 
                    <label class="ProductVariantName" for="${labelValue}" name="${labelValue}">${labelValue}</label>
                    <input class="ProductVariantId" type="hidden" value="${hiddenInputId}">
                </td>
                <td  scope="col" style="padding:20px"> 
                    <input class="ProductVariantPrice form-control" type="text">
                </td>
                
                <td class="d-flex" scope="col" style="padding:20px">
                    <input id="${labelValue+'SKU'}" type="text" class="form-control ProductVariantSku">
                </td>
            </tr>`;
        }
    });

    var OpationContainer = document.querySelectorAll(".OpationContainer");
    OpationContainer.forEach((e)=>{
        var inputs=e.querySelectorAll("input");
        var SelectList = e.querySelector("select");
        var btns = e.querySelectorAll("button");
        inputs.forEach((i)=>{
            i.setAttribute("disabled" , "true");
        });
        btns.forEach((btn)=>{
            btn.disabled= true;
        });
        SelectList.setAttribute("disabled" ,"true");
        AddVariationOption.disabled=true;
        SaveVariations.disabled= true;

    });
    Saved = true;
    }   
    SaveVariations.innerText="Saved";

});

function generateCombinationsWithIds(options, index, currentCombination, result) {
    if (index === options.length) {
        result.push(currentCombination.join('/'));
        return;
    }

    const currentOption = options[index];

    for (const value of currentOption.Values) {
        currentCombination.push(`${currentOption.id}/${value}`);
        generateCombinationsWithIds(options, index + 1, currentCombination, result);
        currentCombination.pop();
    }
}


var SubProducts = {
    ProductItem :[],
}


var SaveProducts = document.getElementById("SaveProducts");
SaveProducts.addEventListener('click' , ()=>{
    var TableRows = document.querySelectorAll(".TableRow");
    TableRows.forEach((ele)=>{
        // id name price sku
        

        var PVarId = ele.querySelector(".ProductVariantId").value;
        var PVarName= ele.querySelector(".ProductVariantName").textContent;
        var PVarPrice= ele.querySelector(".ProductVariantPrice").value;
        var PVarSku= ele.querySelector(".ProductVariantSku").value;
        var PItem = {
            ProductVariantId :PVarId,
            ProductVariantName:PVarName,
            ProductVariantPrice:PVarPrice,
            ProductVariantSku:PVarSku, 
            }
        
        SubProducts.ProductItem.push(PItem);

    

    });
    console.log(SubProducts);
});


