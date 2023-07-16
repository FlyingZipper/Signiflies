import prisma from '@/lib/prisma';

async function findUser({email}: {email: string}): Promise<any> {
    
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    })

    return user
}

export default findUser