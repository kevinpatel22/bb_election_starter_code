document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector("#candidates");
    
    axios.get("https://bb-election-api.herokuapp.com/")
    .then(response => {
        // console.log(response);
        let candidates = response.data.candidates;
        candidates.forEach(candidate => {
            
            const li = document.createElement('li');
            li.innerText = "Name: " + candidate.name + "\n" + "Votes: " + candidate.votes;
            ul.appendChild(li);
            
            const form = document.createElement('form');
            form.className = "v-form";
            form.method = "POST";
            form.action = "https://bb-election-api.herokuapp.com/vote";
            li.appendChild(form);
            
            const castvote = document.createElement("button");
            castvote.type = "submit"
            castvote.innerText = "Vote"
            form.appendChild(castvote);
            
            const hiddeninput = document.createElement("input");
            hiddeninput.type = "hidden";
            hiddeninput.name = "name";
            hiddeninput.value = candidate.name;
            form.appendChild(hiddeninput);
        
        });
        
        const vform = document.querySelector(".v-form")
        
        vform.addEventListener('submit', (e) => {
            e.preventDefault();
            
            axios({
                method: "post",
                url: "https://bb-election-api.herokuapp.com/vote",
                data: {
                    name: e.target.querySelector('input[type=hidden]').value
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    .catch (error => {
        console.log(error)
    })

    const refreshbtn = document.querySelector('#refreshbtn')
    refreshbtn.addEventListener('click', () => {
        location.reload();
    })
});
