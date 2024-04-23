# Social-Network


# Overview

* Technical :
- Back-end
  + Spring boot
  + Spring security :
  + JWT : JWT 0.11.5
  + Socket IO
- Front-end:
  + React
  + Redux
  + Material-ui
  + React-router-dom
  + Google Oauth2
  
* Build : Maven Project 4.0.0

* Apache Tomcat 9.x  
* Relationship database management system : Oracle Database
* Hibernate core ORM : Hibernate 
* Integrated development environment (IDE) : IntelliJ IDEA Ultimate

# HOW TO RUN
1. Download and setup IntelliJ IDEA 
2. Download and setup Oracle 
3. Download Repository 
4. Open IntelliJ and wait for Maven download setup dependencies
5. Setup Apache Tomcat

Hit first sight, the homepage represents the functionalities of the memories website. We are on the trait to developing the website's full functionalities including sharing posts, updating the newest daily life, chatting and making small societies into a website. Inspired by Facebook, Linkedln, and many former do, we cover the best experience from those and make our own.

![1](https://user-images.githubusercontent.com/114813626/219269630-50007e23-9df4-4a46-9c8e-a35d273b5076.png)

The logging/ signup page consists of two types, one for the gmail, and account password validation withing request to backend and return back a token validation for sign in/sign up. During the token valid, the user can freely do anything until its expired

![2](https://user-images.githubusercontent.com/114813626/219269716-f3edc666-d560-408e-8411-3e7690c8401a.png)
![3](https://user-images.githubusercontent.com/114813626/219269742-3043f95b-2964-4d6c-b971-8767d883543a.png)

The post when logged in its sorted by time published, from the newest to lastest. Post are displayed whenever the user are following the user or the group interested in.

![4](https://user-images.githubusercontent.com/114813626/219269806-1c1e455b-7df9-4c81-ac38-62f9a9a9ffc7.png)

Create a new post

![5](https://user-images.githubusercontent.com/114813626/219269861-dc7d56ec-de0c-4a27-9da0-1c7753920a35.png)

Display own profile, to customize or post a new feed

![6](https://user-images.githubusercontent.com/114813626/219269922-3bce0014-6459-4a78-bd39-bb4c54e6f1aa.png)
![7](https://user-images.githubusercontent.com/114813626/219269987-c32a64f1-bcca-4707-99d9-09abfb177c55.png)

Send the request to different users, make a new follower or friend to update new feed from another. Sharing in the communities with own stories

![Friend](https://user-images.githubusercontent.com/114813626/219270098-c865298a-1038-4723-8cfe-715e20c3b3f4.png)

# LINUX
1. Install docker: [docker installation](https://docs.docker.com/engine/install/ubuntu/)

    ```bash
    sudo apt-get -y update
    sudo apt-get -y upgrade
    sudo apt-get install apt-transport-https ca-certificates curl \
        gnupg-agent software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
    sudo apt-get -y update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    sudo usermod -aG docker $USER
    ```

2. At the root of the project, run
```
  make clean init build-server build-client
```
# WSL test on Window
If you want to dev on windows for saving time to rebuild docker images by copy the `application.properties` with `eth0` exposed outside, you need to install WSL.
1. `./vas.sh wsl_test` -> this will copy `application.properties` into server resources folder.
2. `docker compose up -d` -> this will run the essential docker containers such as `mysql, kafka, redis.`
3. Start local build server on windows. 
4. Start ReactJS in localhost on windows."# Social-app2" 
"# Social-app2" 
