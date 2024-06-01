<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $data;
    private $condition;
    public function __construct($data, $condition)
    {
        $this->data = $data;
        $this->condition = $condition;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Eksplorasi yang Menginspirasi: Terima Kasih untuk Mencoba Fitur Terbaru')
            ->from('from-me@iqbalfaris.my.id', 'Iqbal Faris Akbar')
            ->view(
                // 'mail.invoice.paid', ['invoice' => $this->invoice]
                'mail.ContactEmail',
                ['data' => $this->data]
            );
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
