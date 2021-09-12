const form = document.querySelector('.form');
const inp = document.querySelector('.input');
const ul = document.querySelector('.ul');

let inpId = document.getElementById('input');

function removeFun(eventTarget){

	try{
		eventTarget.previousElementSibling.style.display = 'none';
	}catch(e){}

	if(eventTarget.style.left == '45px'){
			eventTarget.previousElementSibling.remove();
			eventTarget.remove();
		} 

	eventTarget.style.left = '0px'
	eventTarget.style.position = '';
	inpId.disabled = false;
}


form.addEventListener('submit', (eventSubmit) => {
	eventSubmit.preventDefault();

	if(inp.value){
		const newLi = document.createElement('li');
		newLi.innerText = inp.value;

		ul.prepend(newLi);

		const newDiv = document.createElement('div')
		newDiv.className = 'replace';
		newDiv.style.display = 'none';
		ul.prepend(newDiv)

		inp.value = '';
	}
});

/*
ul.addEventListener('click', (e) => {
	e.preventDefault();

	const li = e.target
   	if(li.tagName == 'LI'){
   		li.classList.toggle('completed')
   	}
});
*/

ul.addEventListener('contextmenu', (e) => {
	e.preventDefault();

	const li = e.target;
	if(li.tagName == 'LI'){
		li.classList.toggle('completed')
	}
});


/*
ul.addEventListener('mousedown', (e)=>{
	console.log('mousedown')
	let li = e.target;
		
	li.style.position = 'absolute';
	li.style.top = li.offsetTop +'px'

	li.previousElementSibling.style.display = 'block';

	let clickX = e.pageX;
	
	const funMouseMove = function(e){
		e.preventDefault();

		if(e.target.tagName == 'LI'){
			e.target.style.left = (e.pageX - clickX) < 0 
			? ('0px') : (e.pageX - clickX) > 45 
			? ('45px') : (e.pageX - clickX + 'px');
		}
	}


	ul.addEventListener('mousemove', funMouseMove);

	ul.addEventListener('onmouseup', (e)=>{
		e.preventDefault();
		console.log('mouseup')
   		ul.removeEventListener('mousemove', funMouseMove);
   		e.onmouseup = null;
   	});

	
});

ul.addEventListener('onmouseup', (e)=>{
		e.preventDefault();
		console.log('mouseup')
   		ul.removeEventListener('mousemove', funMouseMove);
   		e.onmouseup = null;
   	});
*/

ul.onmousedown = function(event){
	inpId.disabled = true;
	event.preventDefault();

	const li = event.target;

	li.style.position = 'absolute';
	li.style.top = li.offsetTop +'px'
	li.previousElementSibling.style.display = 'block';

	let clickX = event.pageX;

	let onMouseMove = function(event){
		event.preventDefault();

		const li = event.target;

		if(li.tagName == 'LI'){
			li.style.left = (event.pageX - clickX) < 0 
			? ('0px') : (event.pageX - clickX) > 45 
			? ('45px') : (event.pageX - clickX + 'px');
		}
	}

	li.addEventListener('mousemove', onMouseMove)
	li.addEventListener('mouseleave', (e) => {if(e.target.tagName == 'LI')removeFun(e.target)})

	li.onmouseup = function(event){
		li.style.top = ''

		li.removeEventListener('mousemove', onMouseMove);

		removeFun(event.target)
	}
}


    ////////////////////////////////////////////////////////////////
   /// при определении позиции элемента, в mouseup аннулировать ///
  /// всегда eventListener добавлять с умом                    ///
 /// disabled лучше менять через id                           ///
////////////////////////////////////////////////////////////////