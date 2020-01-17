export default{
    // base:'/myapp/',
    // history: 'hash',
    singular:true,
    plugins:[
        ['umi-plugin-react',{
            antd:true,
            dva:true,
            // dynamicImport: true,
            // locale: {
            //     enable: true,
            // },
        }]
    ],
    routes:[
        {
            path:'/',
            component:'../layout',
            routes:[
                {
                    path:'/',
                    component:'./HelloWorld'
                },
                {
                    path:'/helloworld',
                    component:'./HelloWorld'
                },
                {
                    path:'/dashboard',
                    routes:[
                        { path:'/dashboard/analysis', component:'Dashboard/Analysis'},
                        { path:'/dashboard/monitor',component:'Dashboard/Monitor'},
                        { path:'/dashboard/workplace',component:'Dashboard/Workplace'}
                    ]
                },
                {
                    path:'/puzzlecards',
                    component:'./puzzlecards'
                },
                {
                    path:'/list',
                    component:'../page/list'
                },
                {
                    path:'/less',
                    component:'../page/css-modules-with-less'
                },
                {
                    path:'/gless',
                    component:'../page/css-modules-with-antd'
                },
                {
                    path:'/select',
                    component:'./MySelect/MySelect'
                },
                {
                    path:'/login',
                    component:'./Login/login'
                },
                {
                    path:'/report',
                    component:'./report/report'
                },
                {
                    path:'/rcreport',
                    component:'./report/RcReport'
                },
                {
                    path:'/rcform',
                    component:'./report/RcForm'
                },
            ]
        },
    ],
    proxy:{
        '/Home':{
            target: 'http://localhost:3059/',
            changeOrigin: true,
        },
        '/Report':{
            target: 'http://localhost:3059/',
            changeOrigin: true,
        },
    }
}