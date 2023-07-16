import { emailIsSignifly } from './emailIsSignifly'

const validateEligibleRegister = ({email, gameDate} : {email: string, gameDate: Date}) : boolean => {
    const isSignifly = emailIsSignifly(email)
    if(isSignifly) return true

    const timeToGame = new Date(gameDate).getTime() - new Date().getTime()
    return timeToGame < 86400000
};

export default validateEligibleRegister;