import { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { useFileSystem } from '@/os/FileSystem';
import { SystemNotification } from '../os/SystemNotification';
import { audioManager } from '@/systems/AudioManager';

interface TriggerCondition {
    id: string;
    requiredFlags: string[];
    title: string;
    message: string;
    onTrigger: () => void;
}

export const NarrativeTriggerSystem = () => {
    const { flags, setFlag } = useGameStore();
    const { revealHiddenFile } = useFileSystem();
    const [activeNotification, setActiveNotification] = useState<{
        id: string;
        title: string;
        message: string;
        onClick?: () => void;
    } | null>(null);

    // Define all trigger conditions
    const triggers: TriggerCondition[] = [
        {
            id: 'trigger_archive_reveal',
            requiredFlags: ['viewed_wechat', 'viewed_browser_history'],
            title: '系统提示',
            message: '检测到新的隐藏文件。在"工作文件"文件夹中发现了异常内容。',
            onTrigger: () => {
                // Reveal the archive folder
                revealHiddenFile('folder_archive');
                // Play notification sound
                audioManager.playNotificationSound();
                // Mark this trigger as fired
                setFlag('archive_revealed', true);
            }
        },
        // Add more triggers here for other story beats
    ];

    // Check triggers whenever flags change
    useEffect(() => {
        triggers.forEach(trigger => {
            // Skip if already triggered
            if (flags[`${trigger.id}_fired`]) return;

            // Check if all required flags are set
            const conditionMet = trigger.requiredFlags.every(flag => flags[flag] === true);

            if (conditionMet) {
                // Mark as fired to prevent re-triggering
                setFlag(`${trigger.id}_fired`, true);

                // Execute trigger action
                trigger.onTrigger();

                // Show notification
                setActiveNotification({
                    id: trigger.id,
                    title: trigger.title,
                    message: trigger.message,
                    onClick: () => {
                        // When clicked, navigate to the relevant location
                        // This could open file explorer, etc.
                        setActiveNotification(null);
                    }
                });
            }
        });
    }, [flags]);

    return (
        <>
            {activeNotification && (
                <SystemNotification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    show={true}
                    onClose={() => setActiveNotification(null)}
                    onClick={activeNotification.onClick}
                    duration={10000}
                />
            )}
        </>
    );
};
