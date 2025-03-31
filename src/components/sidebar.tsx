"use client";
//Just for pathname highlighting though, could always go back if it becomes too slow
import React, { useEffect } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Card,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export const Sidebar = (props: any) => {
  useEffect(() => {}, []);
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="h-full w-full">
      <Accordion isCompact showDivider={false}>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="4" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="5" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="6" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="7" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
