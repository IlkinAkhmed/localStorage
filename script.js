


let input = document.querySelector('#text')
let submit = document.querySelector('#submit')
let deleteAll = document.querySelector('#deleteAll')

let memoElementLocal;
let memoElementTable;
let arr = []

submit.addEventListener('click', (e) => {
    e.preventDefault()
    // input bos ola bilmez
    if (input.value==='') {
        alert('input must not be empty!!!')
        return
    }
    // editde localdan datani deyismek
    if (submit.textContent === 'Edit') {
        submit.textContent='Submit'
        for (let i = 0; i < memoElementLocal.length; i++) {
            console.log(memoElementLocal[i]);
            if (memoElementLocal[i]===memoElementTable.children[0].textContent) {
                memoElementLocal[i]=input.value
                // console.log(memoElementLocal[i]);
                setLocalStorage('user',memoElementLocal)
            }
            
            
        }
        // editde tablede datani deyismek
        memoElementTable.children[0].textContent = input.value
        input.value=''
        return

    } else {
        // local storage yaratmaq
        let tbody = document.querySelector('#tbody')
        let trow = document.createElement('tr')
        let tdText = document.createElement('td')
        let tdEditDelete = document.createElement('td')
        let edit = document.createElement('button')
        let discard = document.createElement('button')

        edit.innerHTML = `<i class="fa-solid fa-pen"></i>`
        discard.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
        tdText.textContent = input.value

        tdEditDelete.append(edit, discard)
        trow.append(tdText, tdEditDelete)
        tbody.append(trow)

        // buttonlar centerde dayanmasi ucun
        tdEditDelete.style.textAlign = 'center'


        arr.push(input.value)
        setLocalStorage('user',arr)
        input.value = ''

        items = JSON.parse(localStorage.getItem('user'))
        // yazilan datani  tableden ve localdan tek tek silmek ucun
        discard.addEventListener('click', () => {
            // ilk addimda table rowu silir
            trow.remove()
            // if sonda bir element qalanda butun datani silmek ucun. else 
            // seklinde ise rowda silinen datani localdan da silir
            if (items.length === 1) {
                localStorage.removeItem('user')
            } else {
                for (let index = 0; index < items.length; index++) {
                    if (items[index] === tdText.textContent) {
                        items.splice(index, 1)
                        setLocalStorage('user',items)
                        arr=[]

                    }

                }
            }

        })
        // table'a yazilan ve butun local storage datasini silmek
        deleteAll.onclick = () => {
            tbody.innerHTML=''
            localStorage.removeItem('user')
            arr=[]
        }

        // yazilan datani hem tablede hem de localda edit elemek
        edit.addEventListener('click', (e) => {
            submit.textContent = 'Edit';
            e.preventDefault()
            input.value = tdText.textContent
            memoElementTable = trow
            memoElementLocal = getLocalStorage('user')
        })

    }
    // localdan data cekmek
    function getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }
    // locala data elave etmek
    function setLocalStorage(key,data) {
        localStorage.setItem(key,JSON.stringify(data))
    }



})