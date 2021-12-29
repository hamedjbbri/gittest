const url = 'https://project-1-api.herokuapp.com/showdates?api_key=farzinjabbary';

axios.get(url)
  .then(res => {
    const result = res.data;
    console.log(result);

    output = '';
    result.forEach(item => {
      output += `<tr>
                    <th class="show__right--mobile-th">DATE</th>
                    <td class="show__right--date">${item.date}</td>
                    <th class="show__right--mobile-th">VENUE</th>
                    <td>${item.place}</td>
                    <th class="show__right--mobile-th">LOCATION</th>
                    <td>${item.location}</td>
                    <td><button class="show__right--btn">BUY TICKETS</button></td>
                  </tr>`;

    })
    document.querySelector('tbody').innerHTML = output;
  })

