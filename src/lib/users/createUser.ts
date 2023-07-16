import prisma from '@/lib/prisma';

async function findOrCreateUser({email, name}: {email: string, name: string}): Promise<any> {
    
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(user) return user

    return await prisma.user.create({
        data: {
            name: name,
            email: email
        }
    })
}

export default findOrCreateUser