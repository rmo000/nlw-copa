import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main(){
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      avatarUrl: "https://github.com/rmo000.png"
    }
  })

  const pool = await prisma.pool.create({
    data:{
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: "2022-11-04T02:51:37.222Z",
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data:{
      date: "2022-11-03T02:51:37.222Z",
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          SecondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId:{
                poolId: pool.id,
                userId: user.id
              }
            }
          }
        }
      }
    }
  })
}

main()