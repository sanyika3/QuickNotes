# QuickNotes (Fejlesztés Alatt)   

   
A QuickNotes egy egyszerű és hatékony webalkalmazás, amely lehetővé teszi a felhasználók számára, hogy gyorsan jegyzeteket   
készítsenek és rendszerezzenek. Az alkalmazás lehetőséget ad a jegyzetek priorizálására és keresésére.   
A felhasználók bejegyzéseket adhatnak hozzá, szerkeszthetnek és törölhetnek, miközben a szövegformázási eszközök   
(például félkövér, dőlt, kiemelés, listák) biztosítják, hogy a jegyzetek jól strukturáltak és könnyen áttekinthetők legyenek.   
A rendszer autentikációt és jogosultságkezelést biztosít, így csak a bejelentkezett felhasználók férhetnek hozzá és kezelhetik   
a saját jegyzeteiket. A projekt Django backend-et és React/Vite frontend-et használ, és a jegyzetek adatainak tárolására egy   
adatbázist alkalmaz.

   
Főbb funkciók:   
Jegyzetek hozzáadása, szerkesztése és törlése   
Kategóriák és prioritások kezelése   
Keresés és szűrés jegyzetek alapján   
Felhasználói bejelentkezés és jogosultságkezelés   
Szövegformázás (félkövér, dőlt, kiemelés, stb.)   
Reszponzív dizájn, mobilbarát felület   

   
A Következő parancsok futtatásához szükséges a Node.js legfrissebb verziója és a python legfrisebb verziója!   

Telepítés (cmd-ben (parancssor) az adott mappában, ahova a webalkalmazást letöltötted):   
```bash
py -m venv .  
```
```bash
Scripts\activate
```  
```bash
pip install -r requirements.txt
```  
```bash
cd frontend 
```   
```bash
npm install 
``` 
```bash
npm run build 
``` 
```bash
cd.. 
```
```bash
cd backend
```
```bash
py manage.py runserver  
```


url amelyen eléred a webalkalmazást webböngészőben ha sikeresen futtattad a parancsokat:  
```bash
http://127.0.0.1:8000/  
```
SuperUser:  
Username: admin  
Password:  admin
