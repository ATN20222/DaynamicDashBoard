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




var OptionsObj = {
    options :[
        {
            OptionName: "colors",
            Values : []
        },
        {
            OptionName: "Sizes",
            Values : []
        }
        
        
    ]
}
var AddVariationOption = document.getElementById("AddVariationOption");
var OpationContainer = document.querySelector(".OpationContainer");

var AddOptionBtn = document.querySelectorAll(".AddOptionBtn");
var OptionsRow = document.querySelector(".OptionsRow");




var ColorCheckBox = document.querySelector(".ColorCheckBox");
var SizeCheckBox = document.querySelector(".SizeCheckBox");
var ColorVar = document.querySelector(".ColorVar");
var SizeVar = document.querySelector(".SizeVar");
var SaveVariationsItems  = document.getElementById("SaveVariationsItems");
var Colors=[];





AddVariationOption.addEventListener('click', () => {
    var ClonedOpationContainer = OpationContainer.cloneNode(true);

        // console.log(ClonedOpationContainer.querySelector(".row .col-lg-12"));
        
        
        OptionsRow.appendChild(ClonedOpationContainer);
        OptionsRow.lastElementChild.querySelector(".row .col-lg-12 .OptionsValuesRow").lastChild.remove();
        // console.log(OptionsRow.lastElementChild.querySelector(".row .col-lg-12 .OptionsValuesRow"));
    // console.log(OptionsRow.querySelector(":last-child"));
    
    
    AddOptionBtn = document.querySelectorAll(".AddOptionBtn");
    
    AddOptionBtn.forEach((AddOpBtn) => {
        AddOpBtn.addEventListener('click' , () => {
            var nextEle = AddOpBtn.closest("div");
            var PrevParent = nextEle.previousElementSibling;
            var PrevOpt = PrevParent.previousElementSibling;
            var PrvSelectedVar = PrevOpt.querySelector('.VarList').value;
            
            var PrevInputValue = PrevParent.querySelector('.OptionInput');
            
            

            // console.log(PrvSelectedVar); 
            // console.log(PrevInputValue); 

            var OptionsValuesRow = nextEle.nextElementSibling.querySelector(".row");
            // console.log(OptionsValuesRow);
            
                if(PrevInputValue.value.split(' ').join('')!=""&&Colors.includes(PrevInputValue.value)==false){
                    OptionsValuesRow.innerHTML += `<div class="col-lg-2 SizeItem">
                    <input type="text" disabled value="${PrevInputValue.value}">
                    <button class="btn RemoveBtn">x</button>
                </div>`
                
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
                                // console.log(Colors);
                            }
                        }
                    }
                });
                // console.log(Colors);


            //     console.log(Colors);
            

        });

    });
});
 


function AddOptHandler(AddOpBtn){
    console.log(AddOpBtn);
}


// AddOptionBtn.forEach((AddOpBtn) => {
//     console.log("AddOpBtn");
// });











// window.onload = () => {
//     if(SizeCheckBox.attributes.getNamedItem("Selected")){
//         SizeVar.classList.add("Show");
//         SaveVariationsItems.classList.add("Show");
//         // console.log(SizeVar.classList);
//     }
//     if(ColorCheckBox.attributes.getNamedItem("Selected")){
//         ColorVar.classList.add("Show");
//         SaveVariationsItems.classList.add("Show");
//         // console.log(SizeVar.classList);
//     }
        
        
//   };

var table = document.getElementById("Table");
var ColorInput = document.getElementById("ColorInput");
var AddColorBtn = document.getElementById("AddColorBtn");
var ColorRow = document.getElementById("ColorRow");

var Colors = [];

AddColorBtn.addEventListener('click', () => {
    if(ColorInput.value.split(' ').join('')!=""&&Colors.includes(ColorInput.value)==false){
        ColorRow.innerHTML += `<div class="col-lg-2 SizeItem">
        <input type="text" disabled value="${ColorInput.value}">
        <button class="btn RemoveBtn">x</button>
    </div>`
    
    Colors.push(ColorInput.value);
    }


    console.log(Colors);
});

ColorRow.addEventListener('click', (event) => {
    if (event.target.classList.contains('RemoveBtn')) {
        const parentColorItem = event.target.closest('.col-lg-2');
        if (parentColorItem) {
            parentColorItem.remove();
            const indexToRemove = Colors.indexOf(parentColorItem.querySelector('input').value);
            if (indexToRemove !== -1) {
                Colors.splice(indexToRemove, 1);
                // console.log(Colors);
            }
        }
    }
});



var Sizes = [];
var SizeInput = document.getElementById("SizeInput");
var AddSizeBtn = document.getElementById("AddSizeBtn");
var SizeRow = document.getElementById("SizeRow");

// AddSizeBtn.addEventListener('click', () => {
//     console.log();
//     if(SizeInput.value.split(' ').join('')  !=""&&Sizes.includes(SizeInput.value)==false){
//             SizeRow.innerHTML += `<div class="col-lg-2 SizeItem">
//             <input type="text" disabled value="${SizeInput.value}">
//             <button class="btn RemoveBtn">x</button>
//         </div>`

//         Sizes.push(SizeInput.value);
//     }

//     console.log(Sizes);
// });

// SizeRow.addEventListener('click', (event) => {
//     if (event.target.classList.contains('RemoveBtn')) {
//         const parentSizeItem = event.target.closest('.SizeItem');
//         if (parentSizeItem) {
//             parentSizeItem.remove();

//             const indexToRemove = Sizes.indexOf(parentSizeItem.querySelector('input').value);
//             if (indexToRemove !== -1) {
//                 Sizes.splice(indexToRemove, 1);
//                 // console.log(Sizes);
//             }
//         }
//     }
// });


var SaveVariationsItems = document.getElementById("SaveVariationsItems");

SaveVariationsItems.addEventListener( 'click' , ()=>{
let combinations = [];

    if(Sizes.length==0 && Colors.length!=0){
        Colors.forEach((item2) => {
            if(!combinations.includes(item2)) 
                combinations.push(item2);
        });
        console.log(Colors);
        
    }else if(Sizes.length!=0 && Colors.length==0){
        Sizes.forEach((item1) => {
        if(!combinations.includes(item1)) 
            combinations.push(item1);
        
        });
    }else{
        Sizes.forEach((item1) => {
        Colors.forEach((item2) => {
            const comb = item1 + '/' + item2;
            if(!combinations.includes(comb)) 
                combinations.push(comb);
        });
        });
    
}

console.log(combinations);
combinations.forEach((ele)=>{
    ;
    if (!document.getElementById(`${ele}tr`)) {
        table.innerHTML += `<tr class="TableRow Center Flex" id="${ele}tr" style="padding:10px;">
            <td  scope="col" style="padding:20px"> 
                <label for="${ele}" name="${ele}">${ele}</label>
                <input type="hidden" value="${ele}">
            </td>
            <td class="d-flex" scope="col" style="padding:20px">
            <label for="${ele+'SKU'}" name="${ele+'SKU'}"></label>
                <input id="${ele+'SKU'}" type="text" class="form-control">
            </td>
            
        </tr>`;
}
});


});
