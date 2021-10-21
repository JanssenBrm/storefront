import React, { useState } from "react";
import { Box, Card, CardContent, Icon, useTheme } from "@apisuite/fe-base";

import { AppCardProps } from "./types";

export const AppCard: React.FC<AppCardProps> = ({ cardContent, contentStyle, icon = "", media, onClick }) => {
  const { palette } = useTheme();

  const [isOver, setOver] = useState(false);

  return (
    <Card
      elevation={isOver ? 8 : 1}
      onClick={
        onClick
          ? onClick
          : () => {
              // Do nothing
            }
      }
      onMouseLeave={() => {
        setOver(false);
      }}
      onMouseOver={() => {
        setOver(true);
      }}
      style={{ cursor: "pointer" }}
    >
      {icon && (
        <Box position="relative">
          <Box p={1} position="absolute" right="0">
            <Icon style={{ color: isOver ? palette.grey["700"] : palette.label }}>{icon}</Icon>
          </Box>
        </Box>
      )}

      {media}

      <CardContent className={contentStyle}>{cardContent}</CardContent>
    </Card>
  );
};
