import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ActivityIcon, UsersIcon, HeartIcon, AlertTriangleIcon } from '../components/icons/Icons';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Active Cases', value: 12, icon: ActivityIcon, color: 'text-primary' },
        { label: 'Staff On Duty', value: 24, icon: UsersIcon, color: 'text-primary' },
        { label: 'Critical', value: 3, icon: HeartIcon, color: 'text-destructive' },
        { label: 'Alerts', value: 2, icon: AlertTriangleIcon, color: 'text-destructive' },
    ];

    const recentActivities = [
        { type: 'New Triage', description: 'Patient, 35F, atypical chest pain.', time: '2m ago' },
        { type: 'MHRS-E Summary', description: 'Patient ID synthetic-id-456 retrieved.', time: '5m ago' },
        { type: 'Alert', description: 'Bed 7 vitals unstable.', time: '8m ago' },
    ];
    
    // Base64 encoded JPEG image
    const triageImageUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAMBAAUAAAABAAAAVgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAWJVESAAMAAAABAAEAAAEVFwAEAAAAAQAAAWgAAAAAAABgAAAAAQAAAGAAAAABcGFpbnQubmV0IDUuMC4xMwAA/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgB9gPoAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDQ2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/vhori/iD8VPBHwmsLK/8AiB4m0jwzZX97Hp1rc6veRWsM1zIrMkId2AMjKjEKMkkHAOK6m3uYbu3juLaSOaGZA8ckbBldSMggjgqRwQeCKAP//Q/vhorxzV/2m/gj4f17UfDmsfFPwNp+saTcS2l/p93r1lDc2dxExSSKWJpA8ciOCrKwBUggjIr1m2uYbu3juLaSOaGZA8ckbBldSMggjgqRwQeCKAP//R/vhorxbX/ANp74G+E9Wv9E8TfGH4faJqulzvbX2n6l4l062urS4jJV4pYZJleORFIIZQCpHBFen6PrWmeI9Isda0PULPVNJ1S3jurG/spkuLa6glUPHNFKhKSRupDKykggggkGgD/0v7+KKK8e8dftMfBD4XazPoXxE+LfgHwdrkEUc02m+IPElhpt3HHMu+J3huJUcK6kMpIwRggkGgD//0/7+KK86+Gfxv+FHxxsL3VPhL8RfCXxCsdNmW3vbrwxrNlq8NtKy7xHLJbSSIjsvzBWIIHIr0WgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACii-igD//2Q==";

    return (
        <div className="space-y-6">
            <header className="flex items-center space-x-4">
                <div className="p-3 bg-primary rounded-lg">
                    <ActivityIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Upasham-ER</h1>
                    <p className="text-muted-foreground">Emergency Response Dashboard</p>
                </div>
                <span className="ml-auto px-3 py-1 text-sm font-semibold text-green-300 bg-green-500/20 rounded-full">Online</span>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex flex-col items-center justify-center p-4 text-center">
                        <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                           <stat.icon className="w-7 h-7" />
                        </div>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </Card>
                ))}
            </div>
            
            <div className="my-6">
                <img src={triageImageUrl} alt="Triage scene in a hospital" className="w-full h-auto rounded-lg object-cover" />
            </div>

            <div className="space-y-4">
                 <Button onClick={() => navigate('/triage')} className="w-full h-12 text-lg">
                    New Emergency Case
                </Button>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="secondary" className="h-12">Staff</Button>
                    <Button variant="secondary" className="h-12">Vitals</Button>
                </div>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="font-medium">{activity.type}</p>
                                <p className="text-muted-foreground">{activity.description}</p>
                            </div>
                            <p className="text-muted-foreground">{activity.time}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Home;
