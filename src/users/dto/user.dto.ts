export class CreateUserDto{
    name : string
    age: number
    gender: "male"| "female" | "others"
}

export class UpdateUserDto{
    name? : string
    age? : number
    gender?: 'male' | 'female' | 'others'
}