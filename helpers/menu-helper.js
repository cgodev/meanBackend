const menuHelper = (role) => {
    const menu = [{
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [{
                    title: 'Main',
                    url: '/'
                },
                {
                    title: 'ProgressBar',
                    url: 'progress'
                },
                {
                    title: 'Graficas',
                    url: 'grafica1'
                },
                {
                    title: 'Promises',
                    url: 'promises'
                },
                {
                    title: 'RXJS',
                    url: 'rxjs'
                },
            ]
        },
        {
            title: 'Mantenimientos',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [{
                    title: 'Medicos',
                    url: 'medicos'
                },
                {
                    title: 'Hospitales',
                    url: 'hospitales'
                },
            ]
        }
    ]
    //console.log(menuData);
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({
            title: 'Usuarios',
            url: 'usuarios'
        })
    }
    return menu
}


module.exports = {
    menuHelper
}