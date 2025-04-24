"use client";

import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <div className="ml-10 mt-5 animation-appear ">
        <div className="text-6xl ">Notes</div>
        <div className="text-6xl ">done</div>
        <div className="text-6xl ">collaboratively.</div>
        <div className="mt-5 text-xl">
          Ascribe helps you your classmates be more efficent with your
          note-taking.
        </div>
        <div className="mt-10 gap-4">
          <Link href="/board">
            <Button color="secondary" variant="shadow">
              Get Started
            </Button>
          </Link>
          <Button className="ml-5">Contact Us</Button>
        </div>
      </div>
    </>
  );
}
