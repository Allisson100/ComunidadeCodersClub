"use strict";
// const string: string = 'texto'
// const booleano: boolean = true
// const numero: number = 10.5 // 0xfff(haxadecimal)
// const arr: string[] = [''] // Nesse array só pode ser passado strings
// const tuple: [number, string] = [1, 'Nome'] //É semelhante ao array, mas na tupla já temos a quantidade de itens definidos e o tipo deles definidos também
// enum Theme {
//     Dark = 'dark',
//     Light = 'light'
// }
// //É um objeto com uma lista
// const any: any = {} // Aqui pode ser atribuido qualquer valor é como se não tivesse tipado, utilizamos ele em casos pontuais. Nesse caso eu posso definir a variável como uma string e depois atribuir um número por exemplo. Sempre evitar o ant, sempre que possível.
// let unknown: unknown = '' //Podemos atribuir qualquer valor aqui também. Se houver a possibilidade, sempre escolha o tipo unknown do que  tipo any, pois o tipo any é possível fazer operações, por exemplo com o split()
// function sum (numberA: number , numberB: number): number {
//     return numberA + numberB
// }
// function teste (numberA: number , numberB: number): void {
// }
// function testeTwo (numberA: number , numberB: number): void {
//     return undefined
// }
// // Tipo void é quando a função não vai retornar nada ou retorna undefined
// function testeThree (numberA: number , numberB: number): never {
//     while (true) {
//     }
// }
// // A função do tipo never ela nunca tem fim, ela vai rodar para sempre. Pode ser utilizadas em funções que geram algum erro
// let test = undefined
// let test2 = null
// const obj: object = {
//     a: ''
// } //qualquer objeto
// interface User {
//     nome: string;
//     idade?: string;
// }
// interface PrintUserReturn {
//     idade: number;
//     cidade: string
// }
// function printUser(user: User) {
//     console.log(user.nome)
//     console.log(user.idade)
//     return { idade: 22 , cidade: 'Fortaleza' }
// }
// //Interfaces são os principais para tipar objetos
// interface Aluno {
//     name: string;
//     grade: number;
//     status?: 'active' | 'inactive'
// }
// const Alunos: Aluno[] =  [
//     {name: 'Allisson', grade: 10, status: 'active'},
//     {name: 'Allisson', grade: 10, status: 'active'},
//     {name: 'Allisson', grade: 10},
//     {name: 'Allisson', grade: 10, status: 'inactive'},
// ]
// interface GithubUserData {
//     // followers_url: string;
//     // following_url: string;
//     readonly followers: string;
//     following: string;
//     //Diversos outros dados da API DO GITHUB aqui
// }
// //Partial
// function printGitHubUserData(user: Partial<GithubUserData>) {
//     console.log(user);
// }
// //Pick
// function printGitHubUserDataPick(user: Pick<GithubUserData, 'followers' | 'following'>) {
//     console.log(user.followers);
//     console.log(user.following);
// }
// //Omit
// function printGitHubUserDataOmit(user: Omit<GithubUserData, 'followers'>) {
//     console.log(user.following);
// }
// //Readonly
// const newGitHubUser: GithubUserData = {
//     followers: '190',
//     following: '190',
// }
// newGitHubUser.following = '200'
// //Generics
// function print<T>(param: T) {
//     console.log(param); 
// }
// function printNumber(number: number) {
//     print<number>(number)   
// }
// print<string>('text')
function useState(initialState) {
    let state = initialState;
    function setState(newState) {
        state = newState;
        return state;
    }
    return { state, setState };
}
const state = useState(10);
