import mongoose from "mongoose";
import dotenv from "dotenv";
import CatModel from "../models/cat.model.ts";

dotenv.config();

export const mockBreeds = [
  {
    name: "Ragdoll",
    breed: "Ragdoll",
    description: "Placid, sweet-natured, and extremely affectionate. Ragdolls are famous for going limp in your arms when held, earning them their name. They have beautiful blue eyes and soft semi-long fur.",
    lifeSpan: 15,
    energyLevel: "Low",
    kidsFriendly: true,
    apartmentFriendly: true,
    color: "Seal Point",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg4HGjn72NgvxBbnZAexhmdX1N7ne4CwHE8gibpsrxGP6F5oCgry5In1FeDB53iFqQCwCEl2Mj8cyKc_VeaTrwgkYgRHi3LxxrEs1pNPYyXkCoNexypy0jp2wuMkp5qvQGGhW_YVXFano3NiHZC9G-0H5k7PZs9Q_3tLRDnWLpJayTmaYdFB1T8N3wPnACTb0J5O92a0HPDx9y6gkznCuaJQXv-OE068EI8OYC4gvU5EixlnlMgMkCrbKBC4SIVT4D-2hBytrZWtSO",
  },
  {
    name: "Maine Coon",
    breed: "Maine Coon",
    description: "The gentle giant of the cat world. Maine Coons are friendly, intelligent, and known for their shaggy coats, tufted ears, and large paws. They have a dog-like personality and love water.",
    lifeSpan: 13,
    energyLevel: "Medium",
    kidsFriendly: true,
    apartmentFriendly: false,
    color: "Brown Tabby",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvMkAsFa8Z2lH6q5N_-YI5tK6w_GBam7gMqPmsQyV8N5vHEqy_zAbcVRl4BMOPXAbjpYUYVNmkZGejPYiheCCS2I93jYba0Ij-DeLPmK7DID7sp-yBVGGEs8NFwWPf1vgjTfjy2WYKIgp9k1DzHebCx6_81esR3OkTYIKTEd0L2r43_CeFW7p6fk_qUPK_vURjZMSIV0g3KNUEKINADLNOMmcNmGFm67Imf13WepPeFuMCCnwbCUJSnh4Se2ZpytMrXJkiaEjDLghX",
  },
  {
    name: "British Shorthair",
    breed: "British Shorthair",
    description: "Easygoing, calm, and quiet. They are very loyal companions but enjoy their own independence. Their dense, plush coat and round faces give them a cuddly, teddy-bear appearance.",
    lifeSpan: 14,
    energyLevel: "Low",
    kidsFriendly: true,
    apartmentFriendly: true,
    color: "Blue",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc0A52aRbBm5jxADy1keEAT98FOSKjmSvXK9MeHi3lgn11egYA9e77nxP5E9vY5H654K0jpvLqpcix5PGhpzB1Lj8wwfJIua1c7sn1eUjhg7GQeTrQQGq1ROqaIJZp6Busr4JjUru00F8K8qFMbzqie5s50Lsxk-xl7RxXlo0tegMFRAGYX6tPiRmj1UvLDyiDW-nrAC20tB4GYJDheuwD3X_wLmVS8J6oscypMFFDP8vjWfYEpk6sABW1OzNxhZflxGy6TD2WdEGD",
  },
  {
    name: "Siamese",
    breed: "Siamese",
    description: "Highly vocal, social, and intelligent. Siamese cats love human interaction, have a striking colorpoint coat with vivid blue eyes, and will follow you around the house to express their thoughts.",
    lifeSpan: 15,
    energyLevel: "High",
    kidsFriendly: true,
    apartmentFriendly: true,
    color: "Lilac Point",
    image: "https://images.unsplash.com/photo-1513360309081-36f5e878fc9e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Persian",
    breed: "Persian",
    description: "Dignified, docile, and quiet. Persian cats are famous for their long, luxurious coats, sweet flat faces, and quiet voices. They prefer a peaceful environment and appreciate gentle handling.",
    lifeSpan: 12,
    energyLevel: "Low",
    kidsFriendly: false,
    apartmentFriendly: true,
    color: "White",
    image: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Bengal",
    breed: "Bengal",
    description: "Active, athletic, and wild-looking. Bengal cats are highly energetic, highly intelligent, and exhibit a stunning spotted or marbled leopard-like coat. They love climbing and playing in water.",
    lifeSpan: 12,
    energyLevel: "High",
    kidsFriendly: true,
    apartmentFriendly: false,
    color: "Spotted Tabby",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoXHHxwOePGf-ZyUqK2cHSaoNr910yTTr6jXPjxV1SMK1IH4ZDKRIO8LXdLAzJSoDjIHWLUviuumJb_TImun3_SUEZ6vmhE3V2276mQ8JzMiqiCtzQ2PbbnTH8DS8Q5WWtvTdd7GC70D4ZZhV8_G_Qa8d_yihdOIKwpsNp6fcl5VBkvagIqhHL1hTBVYhda8Ba5Sqr9_zpvCvZtXbKznky9MaOncV3h2YL1ndoJqMX4Nb5KjX0ZZVVRl2UMR2LMj_ANOoNOoeR6LWq",
  },
  {
    name: "Abyssinian",
    breed: "Abyssinian",
    description: "Inquisitive, active, and athletic. Abyssinians are natural acrobats that love climbing to the highest spot in the room. They are highly interested in their surroundings and love playtime.",
    lifeSpan: 14,
    energyLevel: "High",
    kidsFriendly: true,
    apartmentFriendly: true,
    color: "Ruddy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5lslqmjPGuS4OrbKK1lMuj6HN787XjtNrrI1TGgEszSrITKMfp6r_725KzmLuKxeJ_kdgnrqLj9z51uvPAE85N2VsqK3n3eiG_R6Kwru5gv90JOgpsTNZFPPGtQhWyqBDezkXs66_jbrm-yp67WToyg81vtIV8ShDKsLBLlLfC75CrvvYbpQsjeNB5NtIvBMY7rumgKfK755Ku7QVS0JwXzpzqmnWwEi3zPeEoBoex1GG6y41ocfAWbN-t6rWkMQnbgMGmpKvbepn",
  },
  {
    name: "Scottish Fold",
    breed: "Scottish Fold",
    description: "Gentle, quiet, and adaptable. Known for their unique folded ears and round, owl-like faces. Scottish Folds are very affectionate, get along with everyone, and often sit in odd poses.",
    lifeSpan: 13,
    energyLevel: "Medium",
    kidsFriendly: true,
    apartmentFriendly: true,
    color: "Grey",
    image: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?q=80&w=600&auto=format&fit=crop",
  },
];

export const seedDatabase = async () => {
  try {
    const count = await CatModel.countDocuments();
    if (count === 0) {
      console.log("Seeding breeds database...");
      await CatModel.insertMany(mockBreeds);
      console.log("Database seeded successfully with 8 breeds.");
    } else {
      console.log(`Database already has ${count} records. Skipping auto-seed.`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
