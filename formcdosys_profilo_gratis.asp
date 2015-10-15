<!--METADATA TYPE="typelib" UUID="CD000000-8B95-11D1-82DB-00C04FB1625D" NAME="CDO for Windows 2000 Type Library" -->
<!--METADATA TYPE="typelib" UUID="00000205-0000-0010-8000-00AA006D2EA4" NAME="ADODB Type Library" -->
<%


DIM corpoMessaggio, numeroCampi, invioA, invioDa, nomeDominio, indirizzoIp, modulo, browserSistemaOperativo,id_corso

	'* voce da modificare con il proprio indirizzo email
	

'invioA =  "p.guglielmo@mvitalia.com"
invioA =  "a.nota@mvitalia.com"


' SALVATTAGGIO IN DB
dim connessione 
connessione = "DRIVER={MySQL ODBC 3.51 Driver};Server=62.149.150.101;Database=Sql280123_3;Uid=Sql280123;Pwd=b73e5b12" 

dim id_attivita
dim rs
dim cn
set cn = server.CreateObject("Adodb.Connection")
set rs = server.CreateObject("Adodb.Recordset")

cn.ConnectionString = connessione
cn.Open 

dim sql
dim rs3
set rs3 = server.CreateObject("Adodb.Recordset") 
sql = "Select titolo FROM app_macrocategorie WHERE ID=" & request.Form("macrocategoria")
rs3.open sql,cn
dim nomeMacro
nomeMacro = rs3.Fields("titolo")

dim rs2
set rs2 = server.CreateObject("Adodb.Recordset")   
sql = "Select titolo FROM app_categorie WHERE ID=" & request.Form("categoria")
rs2.Open sql, cn
dim nomeCategoria 
nomeCategoria = rs2.Fields("titolo")

'AZIENDA
rs.open "Select * From app_attivita ", cn, 2, 3
rs.addnew()
dim stringa_query
	
Dim oggi_data, oggi_mese, oggi_giorno, oggi_format
oggi_data = Date()
oggi_mese = Right(Month(oggi_data),2)
oggi_giorno = Right(Day(oggi_data),2)
oggi_format = Year(oggi_data) & "-" & oggi_mese & "-" & oggi_giorno & " " & hour(Time()) & ":" & minute(Time()) & ":" & second(Time())
	
	
stringa_query = "insert into app_attivita(ragione_sociale,piva,indirizzo,num,paese,provincia,cap,tel,mail,data,stato,user,id_categoria) values('" & replace_apice(request.Form("ragione_sociale")) & "','" & request.Form("piva") & "','" & replace_apice(request.Form("indirizzo")) & "','" & request.Form("num") & "','" & replace_apice(request.Form("paese")) & "','" & replace_apice(request.Form("provincia")) & "','" & request.Form("cap") & "','" & request.Form("cell") & "','" & request.Form("mail") & "','" & oggi_format & "','attivo','web'," & request.Form("categoria") &")"

rs = cn.Execute(stringa_query)

dim rs1
dim ultimo_id
Set rs1 = Server.CreateObject("ADODB.Recordset")
ultimo_id = "SELECT LAST_INSERT_ID()"
rs1 = cn.Execute(ultimo_id)
id_attivita = rs1(0)

cn.Close
set rs=nothing
set cn=nothing
			
		
' CONTRATTO
set cn = server.CreateObject("Adodb.Connection")
set rs = server.CreateObject("Adodb.Recordset")

cn.ConnectionString = connessione
cn.Open 
rs.open "Select * From app_contratti ", cn, 2, 3

rs.addnew()


Dim data_inizio, data_inizio_mese, data_inizio_giorno, data_inizio_format
data_inizio = Date()
data_inizio_mese = Right(Month(data_inizio),2)
data_inizio_giorno = Right(Day(data_inizio),2)
data_inizio_format = Year(data_inizio) & "-" & data_inizio_mese & "-" & data_inizio_giorno

Dim data_fine, data_fine_mese, data_fine_giorno, data_fine_format
data_fine = DateAdd("yyyy",1,data_inizio)
data_fine_mese = Right(Month(data_fine),2)
data_fine_giorno = Right(Day(data_fine),2)
data_fine_format = Year(data_fine) & "-" & data_fine_mese & "-" & data_fine_giorno

if id_attivita = "" then
	id_attivita = 0
end if

stringa_query = "insert into app_contratti(ID_attivita,tipo_contratto,data_inizio,data_fine,referente,tel_referente,mail_referente,note,data,stato,user,utente_login,pass_login) values(" & id_attivita & ",'free','" & data_inizio_format & "','" & data_fine_format & "','" & request.Form("nome") & " " & request.Form("cognome") & "','" & request.Form("cell") & "','" & request.Form("mail") & "','" & request.Form("messaggio") & "','" & oggi_format & "','non_attivo','web','"& request.Form("username") &"','"& request.Form("password") &"')"


cn.Execute(stringa_query) 
cn.Close
set rs=nothing
set cn=nothing




' INVIO MAIL

		
invioDa =  Request.Form("mail")
if Request.Form("check_send") = "" then


	'------------fine modifiche necessarie------------------
	
	nomeDominio 				= Request.ServerVariables("HTTP_HOST")
	indirizzoIp					= Request.ServerVariables("REMOTE_ADDR") 
	modulo						= Request.ServerVariables("HTTP_REFERER")
	browserSistemaOperativo		= Request.ServerVariables("HTTP_USER_AGENT")
	
	
	FOR numeroCampi = 1 TO (Request.Form.Count() - 1)
	   IF NOT Request.Form(numeroCampi) = "" THEN
		  corpoMessaggio = corpoMessaggio & "<br>" & Request.Form.Key(numeroCampi) & " = " & Trim(Request.Form(numeroCampi))
		  nome = " " & Trim(Request.Form(1))
		  cognome = " " & Trim(Request.Form(2))
		  ragioneSociale = " " & Trim(Request.Form(3))
		  username = " " & Trim(Request.Form(13))
		  password = " " & Trim(Request.Form(14))
	   END IF
	NEXT
	
	corpoMessaggio = corpoMessaggio & "<br> nome_macrocategoria = " & nomeMacro
	corpoMessaggio = corpoMessaggio & "<br> nome_categoria = " & nomeCategoria
	
	
		
	DIM iMsg, Flds, iConf
	
	Set iMsg = CreateObject("CDO.Message")
	Set iConf = CreateObject("CDO.Configuration")
	Set Flds = iConf.Fields
	
	Flds(cdoSendUsingMethod) = cdoSendUsingPort
	Flds(cdoSMTPServer) = "localhost" 
	Flds(cdoSMTPServerPort) = 25
	Flds(cdoSMTPAuthenticate) = cdoAnonymous ' 0
	Flds.Update
	
	
	
	With iMsg
	  Set .Configuration = iConf
	   .To = invioA
	   .From = invioDa
	   .sender=invioDa
	   .Subject = "Richiesta iscrizione Trovo x Te " & nomeDominio
	   .HTMLBody = "<img src='http://www.trovoperte.com/images/logo_trovoperte.png' alt='logo Trovo x Te' style='float: center' /><br><br><font face=verdana size=2>Richiesta di iscrizione<br><br><br><br> Questi i dati inseriti nel modulo presente alla pagina <b> " & modulo & " </b><br><br>" & corpoMessaggio 
	   .Send
	End With
	
	Set iMsg = Nothing
	Set Flds = Nothing
	Set iConf = Nothing
	
	DIM iMsg2, Flds2, iConf2
	
	Set iMsg2 = CreateObject("CDO.Message")
	Set iConf2 = CreateObject("CDO.Configuration")
	Set Flds2 = iConf2.Fields
	
	Flds2(cdoSendUsingMethod) = cdoSendUsingPort
	Flds2(cdoSMTPServer) = "smtp.mvitalia.com" 
	Flds2(cdoSMTPServerPort) = 25
	Flds2(cdoSMTPAuthenticate) = cdoAnonymous ' 0
	Flds2.Update
	
	With iMsg2
	  Set .Configuration = iConf2
	   .To = invioDa
	   .From = invioA
	   .sender=invioDa
	   .Subject = "Registrazione a Trovo x Te " & nomeDominio
	   .HTMLBody = "<font face=verdana size=2>Buongiorno " & nome & " " & cognome & ", <br>abbiamo ricevuto la tua richiesta, un nostro operatore verificher&agrave; i dati da te inseriti e confermer&agrave; la registrazione.<br><br>Per arricchire la tua scheda non esitare, accedi al portale <a href='http://www.trovoperte.com/app'>Trovo x Te</a> e attraverso l'area riservata potrai modificare i dati della tua attivita&#768;.<br>Se vorrai potrai contattarci per cambiare la tipologia di contratto scegliendo la più adatta alle tue esigenze.<br><br>Grazie e arrivederci.<br><br> Le tue credenziali sono: <br> <b>username:</b>" & username & "<br><b>password:</b>" & password & "<br><br><br><b>Trovo x Te</b><br><i>Il portale creato apposta per te, per trovare in mondo facile e veloce quello che ti serve nel tuo territorio.</i><br><br><img src='http://www.trovoperte.com/images/logo_trovoperte.png' alt='logo Trovo x Te' style='width:300px' />"
	   .Send
	End With
	
	
	Set iMsg2 = Nothing
	Set Flds2 = Nothing
	Set iConf2 = Nothing
	response.redirect("trovo_per_te_iscrizione_ok.html")

end if
%>
	
<%
Function replace_apice(testo)
	'controllo che la lunghezza della stringa sia maggiore di zero
	If Len(testo)>0 Then
		testo = Replace (testo, "'", "''" )
	End If
	' restituisco la stringa di testo modificata
	replace_apice = testo
End Function

%>
