'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Calendar from "@/components/Calendar";
import HeroCard from "@/components/Firebase_Components/HeroCardDisplay";
import ReservationForm from "@/components/Firebase_Components/ReservationForm";
import EmailSearchAndCollection from "@/components/Firebase_Components/EmailSearchCollection";

//Make sure to npm-i

export default function Home() {
  return (
    <div>
    <Calendar/>
    <HeroCard />
    <ReservationForm />
    <EmailSearchAndCollection />
    </div>
  );
}
