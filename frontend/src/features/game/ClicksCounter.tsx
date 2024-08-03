import { useAppSelector } from '@/common/hooks.ts';
import { Typography } from '@mui/material';

export function ClicksCounter() {
    const clicks = useAppSelector((state) => state.game.clicks);

    return <Typography>{`Current # of clicks: ${clicks}`}</Typography>;
}
