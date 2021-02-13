# Micro SFI Websec Workshops

[Strona domowa wszystkich ćwiczeń](http://nf-ssrf.tech)
(dostępne przez kilka dni po 13.02.2021)

# Jak samemu zainstalować zadania?
## Wszystkie na raz

```sh
# w folderze głównym
sudo docker-compose up --build
```

## Każde zadanie osobno

### burp training
```sh
cd burp_training
sudo docker build -t burp .
sudo docker up -p 5000:5000 burp
```
http://localtest.me:5000

### command injection
```sh
cd task_command_injection
sudo docker build -t cmd_injection .
sudo docker up -p 5001:5001 cmd_injection
```
http://localtest.me:5001
### IDOR
```sh
cd task_idor
sudo docker build -t idor .
sudo docker up -p 5002:5002 idor
```
http://localtest.me:5002

### path traversal 
#### (nie robiliśmy tego na zajęciach)
```sh
cd task_path_traversal
sudo docker build -t path .
sudo docker up -p 5003:5003 path
```
http://localtest.me:5003
