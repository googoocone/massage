import { PrismaClient } from '@prisma/client'
import { fakerKO as faker } from '@faker-js/faker'
import { CATEGORY } from '../constants/index'

const prisma = new PrismaClient()

async function seedUser() {
  const users = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    desc: faker.lorem.paragraph(),
  }))

  // 비동기 작업을 순차적으로 실행
  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    })
  }
}

async function seedRooms() {
  const totalUsers = await prisma.user.findMany()
  if (totalUsers?.length > 1) {
    Array.from({ length: 20 }, (v, i) => i).forEach(async () => {
      const randomUserIndex = Math.floor(Math.random() * totalUsers.length)
      const randomUser = totalUsers[randomUserIndex]

      const roomData = {
        title: faker.lorem.words(),
        images: [
          faker.image.urlLoremFlickr({
            category: 'hotel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'travel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'nature',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'building',
            width: 500,
            height: 500,
          }),
        ],
        lat: getRandomLatitude(),
        lng: getRandomLongtitude(),
        address:
          faker.location.state() +
          faker.location.street() +
          faker.location.streetAddress({
            useFullAddress: true,
          }),
        desc: faker.lorem.paragraph(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        price: parseInt(
          faker.commerce.price({ min: 50000, max: 500000, dec: 0 }),
        ),
        bedroomDesc: faker.lorem.words(),
        freeCancel: faker.datatype.boolean(),
        selfCheckIn: faker.datatype.boolean(),
        officeSpace: faker.datatype.boolean(),
        hasMountainView: faker.datatype.boolean(),
        hasFreeLaundry: faker.datatype.boolean(),
        hasAirConditioner: faker.datatype.boolean(),
        hasWifi: faker.datatype.boolean(),
        hasBarbeque: faker.datatype.boolean(),
        hasFreeParking: faker.datatype.boolean(),
        hasShampoo: faker.datatype.boolean(),
        userId: randomUser.id,
      }

      const res = await prisma.room.create({
        data: roomData,
      })
    })
  }
}

function getRandomLatitude() {
  const minLatitude = 37.4316
  const maxLatitude = 37.701

  return faker.number
    .float({
      min: minLatitude,
      max: maxLatitude,
      fractionDigits: 5,
    })
    ?.toString()
}

function getRandomLongtitude() {
  const minLongtitude = 126.7963
  const maxLongtitude = 127.1839

  return faker.number
    .float({
      min: minLongtitude,
      max: maxLongtitude,
      fractionDigits: 5,
    })
    ?.toString()
}

async function seedFaqs() {
  Array.from({ length: 10 }, (v, i) => i).forEach(async () => {
    const faqData = {
      title: faker.lorem.words(),
      desc: faker.lorem.paragraph(),
    }

    const res = await prisma.faq.create({
      data: faqData,
    })
  })
}

async function main() {
  // await seedUser()
  // await seedRooms()
  await seedFaqs()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
