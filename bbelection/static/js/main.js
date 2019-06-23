document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector('#candidates');

    axios.get('https://bb-election-api.herokuapp.com/')
    .then(response => {
        console.log(response.data);
        let candidates = response.data.candidates;
        candidates.forEach(candidate => {
            let li = document.createElement('li');
            li.innerText = 'Name: ' + candidate.name + '\n' + 'Votes: ' + candidate.votes + '\n\n\n';
            ul.appendChild(li);
        });
            
        });
    
});
