$(function()
{
	var $ultimoClicado;
	var editando=false;

	function deletarCorrida()
	{
		$(this).parent('.corrida')
			.off('click')
			.hide('slow', function(){
				$(this).remove();
			});

		estatistica();
	}

	function estatistica()
	{
		var corridas = $('.corrida');
		var total_duracao=0;
		var total_km=0;
		var total_calorias=0;

		for(var i=0; i<corridas.length; i++)
		{
			var $corrida = $(corridas[i]);

			var duracao = parseInt($corrida.find('.duracao').text());
			console.log(duracao);
			var km = parseInt($corrida.find('.km').text());
			var calorias = parseInt($corrida.find('.calorias').text());
			
			total_duracao+=duracao;
			total_km+=km;
			total_calorias+=calorias;
		}
		
		$('.duracao_final').text(total_duracao);
		$('.km_final').text(total_km);
		$('.calorias_final').text(total_calorias);
		
	}


	function editarColuna()
	{
		editando=true;
		$ultimoClicado=$(this);

		var duracao=$ultimoClicado.children('.duracao').text();
		var km=$ultimoClicado.children('.km').text();
		var calorias=$ultimoClicado.children('.calorias').text();

		$('#duracao').val(duracao);
		$('#km').val(km);
		$('#calorias').val(calorias);
	}


	function salvarCorrida()
	{
		var duracao=$('#duracao').val();
		var km=$('#km').val();
		var calorias=$('#calorias').val();

		var $corrida;

		if(editando) 
		{
			$corrida=$ultimoClicado;
			$corrida.empty();
			editando=false;
			$ultimoClicado=undefined;
			$corrida.append($('<td>').addClass('duracao').text(duracao))
						.append($('<td>').addClass('km').text(km))
						.append($('<td>').addClass('calorias').text(calorias))
						.append($('<td>').addClass('lixeira'));
		}
		else
		{
			$corrida=$('<tr>').addClass('corrida')
						.append($('<td>').addClass('duracao').text(duracao))
						.append($('<td>').addClass('km').text(km))
						.append($('<td>').addClass('calorias').text(calorias))
						.append($('<td>').addClass('lixeira'));

			$('#corridas').append($corrida);
		}

		$('#duracao').val('');
		$('#km').val('');
		$('#calorias').val('');

		
		$('.corrida').click(editarColuna);
		$('.lixeira').click(deletarCorrida);
		estatistica();
	}
	estatistica();
	$('#button').click(salvarCorrida);
	$('.lixeira').click(deletarCorrida);
	$('.corrida').click(editarColuna);
});