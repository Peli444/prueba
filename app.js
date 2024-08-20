function userfrm()
{	let TK=`
	<form id='F1' class='axfrmmed'>
		<center>REGISTRAR</center>
		<label>Nombre</label>
		<input name='nom'>
		<label>Apellido</label>
		<input name='ap'>
		<label>Carnet de identidad</label>
		<input name='ci'>
		<button>GUARDAR</button>
	</form>`;
	axload('C1',TK);
	axelem('F1').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/usersave`,'F1');
		console.log(data);
		if(data.resp)
		{	axmsgok('Se guardo');	}
		else
		{	axmsgerr('No se guardo');	}
	})
}


function userlist(busq)
{	if(busq==undefined){busq='';}
	fetch(`api/userlist/${busq}`)
	.then(resp=>resp.json())
	.then(data=>
	{	console.log(data);
		let TK=`
		<h1>Lista de Usurios</h1>
		<table class="table table-striped table-hover table-bordered">
			<thead>
				<tr class="table-primary">
					<th>#</th>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Ci</th>
				</tr>
			</thead>
			<tbody>`;
			for(P=0; P<data.list.length; P++)
			{	TK+=`
				<tr  id="libro${data.list[P].num}"> 
					<th>${P+1}</th>
					<th>${data.list[P].nom}</th>
					<th>${data.list[P].ap}</th>
					<th>${data.list[P].ci}</th>
					<th>
						<button  class='btn btn-primary' onclick="pasajefrm(${data.list[P].num})">Registrar Pasaje</button>
						<button  class='btn btn-primary' onclick="pasajelist(${data.list[P].num})">Lista de Pasaje</button>
						</th>
				</tr>`;
			}
			TK+=`
			</tbody>
		</table>`;
		document.getElementById('C1').innerHTML=TK;
	})
}


function pasajefrm(num)
{	let TK=`
	<form id='F1' class='axfrmmed'>
		<center>REGISTRAR PASAJE</center>
		<label>Num</label>
		<input name='num' value='${num}'>
		<label>Fecha</label>
		<input name='fech'>
		<label>Ruta</label>
		<input name='ruta'>
		<article class="col-4">
			<label class="form-label">Costo</label>
			<input class="form-control" name="cost" type="number">
		</article>
		<button>GUARDAR</button>
	</form>`;
	axload('C1',TK);
	axelem('F1').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/pasajesave`,'F1');
		console.log(data);
		if(data.resp)
		{	axmsgok('Se guardo');	}
		else
		{	axmsgerr('No se guardo');	}
	})
}


function pasajelist(busq)
{	if(busq==undefined){busq='';}
	fetch(`api/pasajelist/${busq}`)
	.then(resp=>resp.json())
	.then(data=>
	{	console.log(data);
		let TK=`
		<h1>Lista de pasajes</h1>
		<table class="table table-striped table-hover table-bordered">
			<thead>
				<tr class="table-primary">
					<th>#</th>
					<th>Fecha</th>
					<th>Ruta</th>
					<th>Costo</th>
					<th>Numero Usuario</th>
				</tr>
			</thead>
			<tbody>`;
			for(P=0; P<data.list.length; P++)
			{	TK+=`
				<tr  id="${data.list[P].nump}"> 
					<th>${P+1}</th>
					<th>${data.list[P].fech}</th>
					<th>${data.list[P].ruta}</th>
					<th>${data.list[P].cost}</th>
					<th>${data.list[P].num}</th>
					<th>
						<button  class='btn btn-primary' onclick="pasajedel(${data.list[P].nump})">Eliminar</button>
					</th>
				</tr>`;
			}
			TK+=`
			</tbody>
		</table>`;
		document.getElementById('C1').innerHTML=TK;
	})
}

function pasajedel(nump)
{	if(confirm("Esta seguro de eliminar?"))
	{	fetch(`api/pasajedel/${nump}`)
		.then(resp=>resp.json())
		.then(data=>
		{	console.log(data);
			document.getElementById(`${nump}`).style.display='none';
		})
	}
}


