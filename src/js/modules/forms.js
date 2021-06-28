import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const   form        = document.querySelectorAll('form'),
            inputs      = document.querySelectorAll('input'),
            windows = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name = "user_phone"]');


    const message = {
        loading: 'Loading...',
        success: 'Thanks, we call you later',
        failure: 'Sorry, please try later'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                    windows.forEach(item => {
                        if (item.style.display = "block") {
                            item.style.display = "none";
                            document.body.style.overflow = "";
                        }
                    });
                }, 2000);
            });
        });
    });
};

export default forms;