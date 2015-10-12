<%
Response.ContentType = "application/json"

dim tipologia
tipologia = request.QueryString("tipologia")

dim macrocategoria
macrocategoria = request.QueryString("macrocategoria")

dim connessione
connessione = "DRIVER={MySQL ODBC 3.51 Driver};Server=62.149.150.101;Database=Sql280123_3;Uid=Sql280123;Pwd=b73e5b12"

Dim conn 
Set conn = Server.CreateObject("ADODB.Connection") 
conn.Open connessione

Dim newsPromo
Dim rsNewsPromo
if tipologia <> "" then
    Dim sqlNewsPromo
    
        if tipologia = "macrocategorie" then
            sqlNewsPromo = "SELECT app_macrocategorie.ID, app_macrocategorie.titolo FROM app_macrocategorie"
			
			
			Set rsNewsPromo = Server.CreateObject("ADODB.Recordset")		 

			rsNewsPromo.Open sqlNewsPromo, conn

			
			Set newsPromo = jsArray()
			if not rsNewsPromo.EOF then
				while not rsNewsPromo.EOF
					Set newsPromo(null)=jsObject()
					newsPromo(null)("id_macrocategoria") = rsNewsPromo.Fields("id")
					newsPromo(null)("titolo_macrocategoria") = rsNewsPromo.Fields("titolo")
					rsNewsPromo.MoveNext()
				wend
			end if
			
        end if
        if tipologia = "categorie" then
            sqlNewsPromo = "SELECT app_categorie.ID, app_categorie.titolo FROM app_categorie, app_macrocategorie WHERE app_categorie.ID_macrocategoria = app_macrocategorie.ID and app_macrocategorie.titolo = '" & macrocategoria & "'"
			
			
			Set rsNewsPromo = Server.CreateObject("ADODB.Recordset")		 

			rsNewsPromo.Open sqlNewsPromo, conn

			
			Set newsPromo = jsArray()
			if not rsNewsPromo.EOF then
				while not rsNewsPromo.EOF
					Set newsPromo(null)=jsObject()
					newsPromo(null)("id_categoria") = rsNewsPromo.Fields("id")
					newsPromo(null)("titolo_categoria") = rsNewsPromo.Fields("titolo")
					rsNewsPromo.MoveNext()
				wend
			end if
			
        end if    

end if


%>
<!--#include file="JSON_library.asp"-->
<!--#include file="JSON_UTIL.asp"-->

<%
'QueryToJSON(conn, sql).Flush
%>
<%
newsPromo.Flush
%>

<% 'response.write """,""foto"""
	'	response.write ": ["
		'lista foto
	'	dim rs_foto
	'	sql_foto = "Select * From app_foto WHERE ID_attivita = " & rs.Fields("ID") 
	'	Set rs_foto = Server.CreateObject("ADODB.Recordset") 
	'	rs_foto.Open sql_foto, conn
		
	'	if not rs_foto.EOF then
	'		while not rs_foto.EOF
	'			response.write "{""immagine"""
	'			response.write ": """
	'			response.write rs_foto.Fields("immagine") 
	'			response.write """,""titolo"""
	'			response.write ": """
	'			response.write rs_foto.Fields("titolo") 
	'			response.write """,""tipologia"""
	'			response.write ": """
	'			response.write rs_foto.Fields("tipologia") 
	'			response.write """}"
				
	'			rs_foto.MoveNext
	'		wend
			
	'		rs_foto.Close
	'		set rs_foto=nothing

	'	end if
		
	'	response.write "]"
		'fine foto	
%>

<%
rsNewsPromo.Close
conn.Close
set rsNewsPromo=nothing
set conn=nothing
%>
                                    
                                