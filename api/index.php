<?php
header("Content-Type: application/json");
$BDD=new mysqli("localhost","root","redes2024","pasajes");

$tam=strlen(dirname($_SERVER["SCRIPT_NAME"]));
if($tam==1){$inc=0;}else{$inc=1;}
$ruta=explode("/",substr($_SERVER["REQUEST_URI"],$tam+$inc));

$data=array("resp"=>false,"msg"=>"Hola mundo","ruta"=>$ruta);
switch($ruta[0])
{	case "userlist":
		if(isset($ruta[1])){$busq=$ruta[1];}else{$busq='';}
		$list=array();
		$M=$BDD->query("select num,nom,ap,ci from user");
		foreach($M as $V)
		{	array_push($list,array("num"=>$V["num"],"nom"=>$V["nom"],"ap"=>$V["ap"],"ci"=>$V["ci"]));
		}
		$data=array("resp"=>true,"list"=>$list);
	break;

	case "usersave":
		$nom=$_POST["nom"];
		$ap=$_POST["ap"];
		$ci=$_POST["ci"];
		if($BDD->query("insert into user (nom,ap,ci) values ('$nom','$ap','$ci')"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Registro usuario");
	break;

	case "pasajesave":
		$num=$_POST["num"];
		$fech=$_POST["fech"];
		$ruta=$_POST["ruta"];
		$cost=$_POST["cost"];

		if($BDD->query("insert into pasaje (fech,ruta,cost,num) values ('$fech','$ruta','$cost',$num)"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Registro pasaje");
	break;

	case "pasajelist":
		if(isset($ruta[1])){$busq=$ruta[1];}else{$busq='';}
		$list=array();
		$M = $BDD->query("SELECT pasaje.nump, pasaje.num, pasaje.fech, pasaje.ruta, pasaje.cost FROM pasaje JOIN user ON pasaje.num = user.num");
        if ($M) {
            foreach ($M as $V) {
                array_push($list, array("nump" => $V["nump"], "fech" => $V["fech"], "ruta" => $V["ruta"], "cost" => $V["cost"], "num" => $V["num"]));
            }
            $data = array("resp" => true, "list" => $list);
        } else {
            $data['msg'] = "Error en la consulta de pasajes: " . $BDD->error;
        }
        break;

	case"pasajedel":
		if(isset($ruta[1])){$nump=$ruta[1];}else{$nump=0;}
		if($BDD->query("delete from pasaje where nump=$nump"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Eliminar pasaje");
	break;

}
echo json_encode($data);
?>