<?php

namespace AppVentus\Awesome\AlertifyBundle\Twig\Extension;

use Symfony\Component\HttpFoundation\Session\Session;

/**
 * AlertifyExtension
 *
 * @author Paul Andrieux
 */
class AlertifyExtension extends \Twig_Extension
{
    protected $environment;

    /**
     * {@inheritDoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'alertify';
    }

    /**
     * {@inheritDoc}
     */
    public function getFilters()
    {
        return array(
            'alertify' => new \Twig_Filter_Method($this, 'alertifyFilter'),
        );
    }

    /**
     * Alertify filter
     *
     * @param Session $session
     * @return string
     */
    public function alertifyFilter(Session $session)
    {
        $flashes = $session->getFlashBag()->all();

        $renders = array();
        foreach ($flashes as $type => $flash) {
            switch ($type) {
                case 'callback':
                    foreach ($flash as $key => $currentFlash) {
                        $currentFlash['body'] .= $this->environment->render('AvAwesomeAlertifyBundle:Modal:callback.html.twig', $currentFlash);
                        $session->getFlashBag()->add($type, $currentFlash);
                        $renders[$type . $key] = $this->alertifyFilter($session);
                    }
                break;

                case 'modal':
                case 'toastr':
                case 'noty':
                    foreach ($flash as $key => $currentFlash) {
                        $renders[$type . $key] = $this->environment->render('AvAwesomeAlertifyBundle:Modal:' . $type . '.html.twig', $currentFlash);
                    }
                break;
                default:
                    foreach ($flash as $key => $currentFlash) {
                        if (!is_array($currentFlash)) {
                            $currentFlash = array('type' => 'success', 'layout' => 'bottom-left' ,'body' => $currentFlash);
                        }
                        $renders[$key] = $this->environment->render('AvAwesomeAlertifyBundle:Modal:toastr.html.twig', $currentFlash);
                    }
                break;
            }
        }

        return implode(' ', $renders);
    }

}
