# Rotas autenticadas

Criamos a rota de dashboard:

    <Route path='/dashboard' Component={Dashboard} />

Caso nós tivessemos acesso nós fariamos o seguinte:

    async function signIn() {
        try {

            setLoading(true)

            const { data } = await api.post('/signin')

            api.defaults.headers.authorization = `Bearer ${data.token}`

            const apiUSer = {
                name: data.name
            }

            localStorage.setItem('@Auth:TOKEN', data.token)
            localStorage.setItem('@Auth:USER', JSON.stringify(apiUSer))
            localStorage.setItem('@Auth:SIGNED', 'true')

            setUser(apiUSer)
            setSigned(true)
            setLoading(false)

            history.push('/dashboard')
        }
    }

Mas no nosso caso não vai funcionar por conta da api fake que não existe mais, porém nesse caso após ocorrer tudo ok com a autenticação nós seriamos redirecionados para a rota /dashboard.

Essa parte de rotas está muito desatualizada, então vou deixar para estudar depois.
