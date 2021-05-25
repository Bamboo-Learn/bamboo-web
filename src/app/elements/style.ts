

export const progressBackground = (percent: number): { background: string } => {
  const fill = '33a853';
  const back = 'daeedd';
  const displayPercent = percent < 0 ? 0 : percent > 1 ? 100 : 100 * percent;
  return {
    background: `
      linear-gradient(
        90deg, 
        #${fill} 0%, 
        #${fill} ${displayPercent}%,
        #${back} ${displayPercent}%,
        #${back} 100%
      )`
  };
}